const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, Event, Venue, Attendee, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateEvent = []

//POST a new image for a group
router.post(
    '/:eventId/images',
    requireAuth,
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId)

        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const group = await event.getGroup()
        const Attendance = await Attendee.findOne({ where: { eventId: req.params.eventId, userId: req.user.id, status: 'member' } })

        if (group.organizerId === req.user.id || Attendance) {
            const newImage = await Image.create({ eventId: Number(req.params.eventId), userId: req.user.id, url: req.body.url })
            res.json({ id: newImage.id, imageableId: newImage.eventId, imageabletype: 'Event', url: newImage.url })
        } else {
            const err = new Error('User must be either the organizer or an attendee to upload images')
            err.status = 403
            return next(err)
        }
    }
)

//DELETE attendance to an event
router.delete(
    '/:eventId/attendees',
    requireAuth,
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId)

        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const group = await event.getGroup()

        if (!group) {
            const err = new Error('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const Attendance = await Attendee.findOne({ where: { eventId: req.params.eventId, userId: req.body.userId, } })

        if (!Attendance){
            const err = new Error('Attendance does not exist for this User')
            err.status = 404
            return next (err)
        }

        if (group.organizerId === req.user.id || Attendance.userId === req.user.id) {
            await Attendance.destroy()
            res.json({ message: "Successfully deleted attendance from event" })
        } else {
            const err = new Error('Only the User or organizer may delete an attendance')
            err.status = 403
            return next(err)
        }
    }
)

//EDIT an attendance
router.put(
    '/:eventId/attendees',
    requireAuth,
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId)
        //check if event exists
        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const group = await event.getGroup()
        const cohost = await Member.findOne({
            where: {
                groupId: group.id,
                memberId: req.user.id,
                status: 'co-host'
            },
        })

        const attendance = await Attendee.findOne({ where: { eventId: req.params.eventId, userId: req.body.userId } })
        //check if request exists
        if (!attendance) {
            const err = new Error('Attendance between the user and the event does not exist')
            err.status = 404
            return next(err)
        }
        //cannot change a status to pending
        if (req.body.status === 'pending') {
            const err = new Error('Cannot change an attendance status to pending')
            err.status = 400
            return next(err)
        }

        if (group.organizerId === req.user.id || cohost) {
            attendance.status = req.body.status
            await attendance.save()
            res.json({ id: attendance.id, eventId: attendance.eventId, userId: attendance.memberId, status: attendance.status })
        } else {
            const err = new Error('Current User must be the organizer or a co-host to update an attendance')
            err.status = 403
            return next(err)
        }
    }

)

//POST a request to attend an event
router.post(
    '/:eventId/attendees',
    requireAuth,
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId)

        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const Attendance = await Attendee.findOne({ where: { eventId: req.params.eventId, userId: req.user.id, } })
        console.log(Attendance)

        if (Attendance) {
            if (Attendance.status === 'pending') {
                const err = new Error('Attendance has already been requested')
                err.status = 400
                return next(err)
            }
            if (Attendance.status === 'member' || Attendance.status === 'waitlist') {
                const err = new Error('User is already an attendee of this event')
                err.status = 400
                return next(err)
            }
        }

        const newAttendance = await Attendee.create({
            eventId: Number(req.params.eventId),
            userId: req.user.id
        })

        const resAttendance = { eventId: newAttendance.eventId, userId: newAttendance.userId, status: newAttendance.status }
        res.json(resAttendance)
    }
)

//GET attendees of an event
router.get(
    '/:eventId/attendees',
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId)

        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const group = await event.getGroup()

        const cohost = await Member.findOne({
            where: {
                groupId: group.id,
                memberId: req.user.id,
                status: 'co-host'
            }
        })

        if (group.organizerId === req.user.id || cohost) {
            const Attendees = await User.findAll({
                include: {
                    model: Attendee,
                    as: 'Attendance',
                    attributes: ['status'],
                    where: {
                        eventId: req.params.eventId
                    }
                }
            })
            res.json({ Attendees })
        } else {

            const Attendees = await User.findAll({
                include: {
                    model: Attendee,
                    as: 'Attendance',
                    attributes: ['status'],
                    where: {
                        eventId: req.params.eventId,
                        status: {
                            [Op.not]: 'pending'
                        }
                    }
                }
            })
            res.json({ Attendees })
        }
    }
)

//DELETE an event
router.delete(
    '/:eventId',
    requireAuth,
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId)

        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const group = await event.getGroup()

        const cohost = await Member.findOne({
            where: {
                groupId: group.id,
                memberId: req.user.id,
                status: 'co-host'
            },
        })

        if (group.organizerId === req.user.id || cohost) {
            await event.destroy()
            res.json({ message: 'Successfully deleted' })
        } else {
            const err = new Error('Current User must be the organizer or a co-host to delete an event')
            err.status = 403
            return next(err)
        }
    }
)

//EDIT an event
router.put(
    '/:eventId',
    requireAuth,
    async (req, res, next) => {
        const event = await Event.findByPk(
            req.params.eventId,
            {
                attributes: ['id', 'groupId', 'venueId', 'name', 'type',
                    'capacity', 'price', 'description', 'startDate', 'endDate']
            }
        )

        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

        const group = await event.getGroup()

        if (venueId) {
            const venue = await Venue.findByPk(venueId)

            if (!venue) {
                const err = new Error('Venue couldn\'t be found')
                err.status = 404
                return next(err)
            }
        }

        const cohost = await Member.findOne({
            where: {
                groupId: group.id,
                memberId: req.user.id,
                status: 'co-host'
            },
        })

        if (group.organizerId === req.user.id || cohost) {
            await event.set({ venueId, name, type, capacity, price, description, startDate, endDate })
            await event.save()
            res.json({ venueId, name, type, capacity, price, description, startDate, endDate })
        } else {
            const err = new Error('Current User must be the organizer or a co-host to edits an event')
            err.status = 403
            return next(err)
        }
    }
)

//GET a specific event

router.get(
    '/:eventId',
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId, {
            attributes: ['id', 'groupId', 'venueId', 'name', 'description',
                'type', 'capacity', 'price', 'startDate', 'endDate'],
            include: [
                {
                    model: Image,
                    as: 'images',
                    attributes: ['url'],
                },
                {
                    model: Group,
                    attributes: ['id', 'name', 'private', 'city', 'state']
                },
                {
                    model: Venue,
                    attributes: ['id', 'address', 'city', 'state', 'lat', 'lng']

                }
            ],
        })

        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const eventJSON = event.toJSON()
        const numAttending = await event.countAttendees({ where: { status: { [Op.in]: ['member'] } } })
        eventJSON.numAttending = numAttending

        res.json(eventJSON)
    }
)

//GET all events

router.get(
    '/',
    async (req, res, next) => {
        const events = await Event.findAll({
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
            ],
        })

        const allEvents = []

        for (let event of events) {
            const eventJSON = event.toJSON()
            if (eventJSON.previewImage[0]) eventJSON.previewImage = eventJSON.previewImage[0].url

            const numAttending = await event.countAttendees({ where: { status: { [Op.in]: ['member'] } } })
            eventJSON.numAttending = numAttending

            allEvents.push(eventJSON)
        }

        res.json({ Events: allEvents })
    })

module.exports = router
