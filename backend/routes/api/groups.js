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

//POST a request to be a member of a group
router.post(
    '/:groupId/members',
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const newMember = await Member.create({
            groupId: Number(req.params.groupId),
            memberId: req.user.id
        })

        const resMember = {groupId: newMember.groupId, memberId: newMember.memberId, status: newMember.status}
        res.json(resMember)
    }
)

//GET members of a group
router.get(
    '/:groupId/members',
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const membersList = await group.getMembers({
            // include : {
            //     model: User
            // },
            attributes: { exclude: ['UserId'] }
        })
        // exclude UserId due to query looking for UserId despite that column not existing.
        const foundCurrentUser = await Member.findOne({
            where: {
                groupId: req.params.groupId,
                memberId: req.user.id
            },
            attributes: {
                exclude: ['UserId']
            }
            })
        const members = []

        if (membersList.length) {

            for (let member of membersList) {
                let user = await User.findByPk(member.memberId)
                user = user.toJSON()

                user.Membership = {status: member.status}

                //check if currently logged in User is a co-host or a organizer
                //only include pending members IF user is a co-host or a organizer
                if (req.user.id === group.organizerId || foundCurrentUser.status === 'co-host') members.push(user)
                else if (req.user.id !== group.organizerId && user.status !== 'pending') members.push(user)
            }
        }

        res.json(members)

    }
)

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

        res.json(allGroups)
    }
)

module.exports = router
