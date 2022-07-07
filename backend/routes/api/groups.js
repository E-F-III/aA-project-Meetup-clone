const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateGroup = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 60 })
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({ min: 50 })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['Online', 'In person'])
        .withMessage('Type must be Online or In person'),
    check('private')
        .exists({ checkFalsy: true })
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 2 })
        .withMessage('State is required'),
    handleValidationErrors
]


// EVENTS OF A SPECIFIC GROUP ROUTE HANDLERS

router.get(
    '/:groupId/events',
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const events = group.getEvents()

        res.json({ Events: events })
    }
)


// MEMBERSHIPS OF A SPECIFIC GROUP ROUTE HANDLERS

//DELETE a membership
router.delete(
    '/:groupId/members',
    requireAuth,
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        const membership = await Member.findOne({
            where: {
                groupId: req.params.groupId,
                memberId: req.body.memberId
            }
        })

        //check if group exists
        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }
        //check if membership exists
        if (!membership){
            const err = new Error('Membership between the user and the group does not exits')
            err.status = 404
            return next(err)
        }
        //check if current user is either organizer or the member
        if (req.user.id !== group.organizerId && req.user.id !== req.body.memberId){
            const err = new Error('Only the User or organizer may delete a Membership')
            err.status = 403
            return next(err)
        }

        await membership.destroy()
        res.json({
            message: "Successfully deleted membership from group"
          })
    }
)

//PUT a membership from pending to member
router.put(
    '/:groupId/members',
    requireAuth,
    async (req, res, next) => {

        const group = await Group.findByPk(req.params.groupId)

        const membership = await Member.findOne({
            where: {
                groupId: req.params.groupId,
                memberId: req.body.memberId
            },
        })

        const currentUserMembership = await Member.findOne({
            where: {
                groupId: req.params.groupId,
                memberId: req.user.id
            },
        })

        //check if group exists
        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }
        //check if request exists
        if (!membership){
            const err = new Error('Membership between the user and the group does not exits')
            err.status = 404
            return next(err)
        }
        //cannot change a status to pending
        if (req.body.status === 'pending'){
            const err = new Error('Cannot change a membership status to pending')
            err.status = 400
            return next(err)
        }
        //only the organizer can add co-hosts
        if (req.body.status === 'co-host' && group.organizerId !== req.user.id){
            const err = new Error('Current User must be the organizer to add a co-host')
            err.status = 403
            return next(err)
        }
        //current user has to be either an organizer or a co-host to change memberships
        if (group.organizerId !== req.user.id && currentUserMembership.status !== 'co-host') {
            const err = new Error('Current User must be the organizer or a co-host to make someone a member')
            err.status = 403
            return next(err)
        }

        membership.status = req.body.status
        await membership.save()


        res.json({id: membership.id, groupId: membership.groupId, memberId: membership.memberId, status: membership.status})
    }
)

//POST a request to be a member of a group
router.post(
    '/:groupId/members',
    requireAuth,
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const Membership = await Member.findOne({ where: { groupId: req.params.groupId, memberId: req.user.id }, attributes: { exclude: ['UserId'] } })
        if (group.organizerId === req.user.id) {
            const err = new Error('You can\'t request for membership when you are the organizer')
            err.status = 400
            return next(err)
        }
        if (Membership) {

            if (Membership.status === 'pending') {
                const err = new Error('Membership has already been requested')
                err.status = 400
                return next(err)
            }
            if (Membership.status === 'member' || Membership.status === 'co-host') {
                const err = new Error('User is already a member of the group')
                err.status = 400
                return next(err)
            }
        }

        const newMember = await Member.create({
            groupId: Number(req.params.groupId),
            memberId: req.user.id
        })

        const resMember = { groupId: newMember.groupId, memberId: newMember.memberId, status: newMember.status }
        res.json(resMember)
    }
)

//GET members of a group
router.get(
    '/:groupId/members',
    requireAuth,
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const membersList = await group.getMembers()

        const foundCurrentUser = await Member.findOne({
            where: {
                groupId: req.params.groupId,
                memberId: req.user.id
            },
        })
        const members = []

        if (membersList.length) {

            for (let member of membersList) {
                let user = await User.findByPk(member.memberId)
                user = user.toJSON()

                user.Membership = { status: member.status }

                //check if currently logged in User is a co-host or a organizer
                //only include pending members IF user is a co-host or a organizer
                if (req.user.id === group.organizerId || (foundCurrentUser && foundCurrentUser.status === 'co-host')) members.push(user)
                else if (req.user.id !== group.organizerId && user.status !== 'pending') members.push(user)
            }
        }

        res.json(members)

    }
)

// SPECIFIC GROUP ROUTE HANDLERS

//GET a specific group
router.get(
    '/:groupId',
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        // LAZY LOADING INFORMATION
        const groupJSON = group.toJSON()

        groupJSON.numMembers = await group.countGroupMembers()
        groupJSON.images = await group.getImages({ attributes: ['url'] })
        groupJSON.Organizer = await group.getOrganizer()

        res.json(groupJSON)
    }
)

//EDIT a specific group
router.put(
    '/:groupId',
    requireAuth,
    validateGroup,
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        //Group cannot be found
        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }
        //Only the owner can edit the group
        if (group.organizerId !== req.user.id) {
            const err = new Error('You must be the owner to edit this group')
            err.status = 403
            return next(err)
        }

        const { name, about, type, private, city, state } = req.body

        group.set({
            name: name,
            about: about,
            type: type,
            private: private,
            city: city,
            state: state
        })

        group.save()

        res.json(group)
    }
)

//GENERIC GROUP ROUTE HANDLERS

//DELETE a group
router.delete(
    '/:groupId',
    requireAuth,
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        //Group cannot be found
        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }
        //Only the owner can delete the group
        if (group.organizerId !== req.user.id) {
            const err = new Error('You must be the owner to delete this group')
            err.status = 403
            return next(err)
        }

        await group.destroy()

        res.status(200).json({ message: "Successfully deleted", statusCode: 200 })
    }
)

//POST a new group
router.post(
    '/',
    requireAuth,
    validateGroup,
    async (req, res, next) => {
        const { name, about, type, private, city, state } = req.body
        const newGroup = await Group.create({
            organizerId: req.user.id,
            name,
            about,
            type,
            private,
            city,
            state
        })

        res.json(newGroup)
    }
)

//GET all groups with member count
router.get(
    '/',
    async (_req, res, next) => {
        // EAGER LOADING WITH numMembers. ADDING MORE INCLUDES BREAKS THE COUNT
        const groups = await Group.findAll({
            include: [
                {
                    model: Image, // returns an array. clarify during stand up how to properly do this query
                    as: 'previewImage',
                    attributes: ['url'],
                    limit: 1
                },
            ],
        })

        const allGroups = []

        for (let group of groups) {
            const numMembers = await group.countGroupMembers()
            const groupJSON = group.toJSON()

            groupJSON.numMembers = numMembers
            if (groupJSON.previewImage[0]) groupJSON.previewImage = groupJSON.previewImage[0].url
            allGroups.push(groupJSON)
        }

        res.json({Groups: allGroups})
    }
)

module.exports = router
