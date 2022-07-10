const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, Venue, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, where } = require('sequelize');

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
        .exists()
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


// POST a new venue for a group

router.post(
    '/:groupId/venues',
    requireAuth,
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const cohost = await Member.findOne({
            where: {
                groupId: req.params.groupId,
                memberId: req.user.id,
                status: 'co-host'
            },
        })

        const { address, city, state, lat, lng } = req.body

        if (group.organizerId === req.user.id || cohost){
            const newVenue = await Venue.create({ groupId: req.params.groupId, address, city, state, lat, lng })

            res.json({address, city, state, lat, lng})
        } else {
            const err = new Error('Current User must be the organizer or a co-host to create a venue')
            err.status = 403
            return next(err)
        }

    }
)

// GET all events of a group

router.get(
    '/:groupId/events',
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const events = await group.getEvents({
            attributes: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate'],
            include: [
                {
                    model: Image,
                    as: 'previewImage',
                    attributes: ['url'],
                    limit: 1
                },
                {
                    model: Group,
                    attributes: ['id', 'name', 'city', 'state']
                },
                {
                    model: Venue,
                    attributes: ['id', 'city', 'state']

                }
            ]
        })

        const allEvents = []

        for (let event of events) {
            const eventJSON = event.toJSON()
            if (eventJSON.previewImage[0]) eventJSON.previewImage = eventJSON.previewImage[0].url

            const numAttending = await event.countAttendees({ where: { status: { [Op.in]: ['member'] }}})
            eventJSON.numAttending = numAttending

            allEvents.push(eventJSON)
        }

        res.json({Events: allEvents})
    }
)

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

        const cohost = await Member.findOne({
            where: {
                groupId: req.params.groupId,
                memberId: req.user.id,
                status: 'co-host'
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
        if (group.organizerId === req.user.id || cohost) {
            membership.status = req.body.status
            await membership.save()
            res.json({id: membership.id, groupId: membership.groupId, memberId: membership.memberId, status: membership.status})
        } else {
            const err = new Error('Current User must be the organizer or a co-host to make someone a member')
            err.status = 403
            return next(err)
        }

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
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const cohost = await Member.findOne({
            where: {
                groupId: req.params.groupId,
                memberId: req.user.id,
                status: 'co-host'
            }
        })

        if (group.organizerId === req.user.id || cohost) {
            const members = await User.findAll({
                include: {
                    model: Member,
                    attributes: ['status'],
                    as: 'Membership',
                    where: {
                        groupId: req.params.groupId
                    }
                }
            })
            res.json(members)
        } else {

            const members = await User.findAll({
                include: {
                    model: Member,
                    attributes: ['status'],
                    as: 'Membership',
                    where: {
                        groupId: req.params.groupId,
                        status: {
                            [Op.not]: ['pending']
                        }
                    }
                }
            })
            res.json(members)
        }
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

        groupJSON.numMembers = await group.countMembers({ where: { status: { [Op.in]: ['member', 'co-host'] }}})
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

        const groups = await Group.findAll({
            include: [
                {
                    model: Image,
                    as: 'previewImage',
                    attributes: ['url'],
                    limit: 1
                },
            ],
        })

        const allGroups = []

        for (let group of groups) {
            const numMembers = await group.countMembers({ where: { status: { [Op.in]: ['member', 'co-host'] }}})
            const groupJSON = group.toJSON()

            groupJSON.numMembers = numMembers
            if (groupJSON.previewImage[0]) groupJSON.previewImage = groupJSON.previewImage[0].url
            allGroups.push(groupJSON)
        }

        res.json({Groups: allGroups})
    }
)

module.exports = router
