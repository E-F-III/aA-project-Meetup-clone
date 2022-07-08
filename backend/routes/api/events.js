const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, Event, Attendee, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateEvent = []


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

        const group = await event.getGroup()
        const attendance = await Attendee.findOne({ where: { eventId: req.params.eventId, userId: req.user.id}})

        if (attendance) {

            if (attendance.status === 'pending') {
                const err = new Error('Attendance has already been requested')
                err.status = 400
                return next(err)
            }
            if (attendance.status === 'member' || attendance.status === 'waitlist') {
                const err = new Error('User is already an attendee of the event')
                err.status = 400
                return next(err)
            }
        }

        const newAttendee = await Attendee.create({
            eventId: Number(req.params.eventId),
            userId: req.user.id
        })

        const resAttendee = { eventId: newAttendee.eventId, userId: newAttendee.userId, status: newAttendee.status }
        res.json(resAttendee)
    }
)

//GET attendees of a specific event
router.get(
    '/:eventId/attendees',
    requireAuth,
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId)

        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const group = await Group.findByPk(event.groupId)

        const attendanceList = await event.getAttendees()

        const foundCurrentUser = await Member.findOne({
            where: {
                groupId: event.groupId,
                memberId: req.user.id
            },
        })

        const attendees = []

        if (attendanceList.length) {
            for (let attendee of attendanceList) {
                let user = await User.findByPk(attendee.userId)
                user = user.toJSON()

                user.Attendance = { status: attendee.status }

                if (req.user.id === group.organizerId || (foundCurrentUser && foundCurrentUser.status === 'co-host')) attendees.push(user)
                else if (attendee.status !== 'pending') attendees.push(user)
            }
        }

        res.json(attendees)
    }
)

//DELETE a specific event
router.delete(
    '/:eventId',
    requireAuth,
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId)

        //Event cannot be found
        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        //Other queries to verify ownership and membership
        const group = await event.getGroup()
        const membership = await Member.findOne({
            where: {
                groupId: group.id,
                memberId: req.user.id
            },
        })

        //Only the owner and cohosts can delete the event
        if (group.organizerId === req.user.id || (membership && membership.status === 'co-host')) {
            await event.destroy()
            res.json({ message: "Successfully deleted" })
        } else {
            const err = new Error('You must be either the owner or a co-host to delete this event')
            err.status = 403
            return next(err)
        }
    }
)

//GET a specific event
// including numAttending, previewImage, Group, and Venus
router.get(
    '/:eventId',
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId,
            {
                attributes:
                    ['id', 'groupId', 'venueId', 'name', 'type', 'capacity', 'price', 'startDate', 'endDate'],
            },
        )

        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const eventJSON = event.toJSON()
        eventJSON.numAttending = await event.countEventAttendees()
        eventJSON.Group = await event.getGroup({
            attributes: ['id', 'name', 'private', 'city', 'state']
        })
        eventJSON.Venue = await event.getVenue({
            attributes: ['id', 'address', 'city', 'state', 'lat', 'lng']
        })
        eventJSON.Images = await event.getImages()

        res.json(eventJSON)
    }
)

//GET all events
// including numAttending, previewImage, Group, and Venus
router.get(
    '/',
    async (req, res, next) => {
        const events = await Event.findAll({
            attributes:
                ['id', 'groupId', 'venueId',
                'name', 'type', 'startDate']
        })

        const allEvents = []
        for (let event of events) {
            const eventJSON = event.toJSON()
            const images = await event.getImages()

            if (images.length) eventJSON.previewImage = images[0].url
            else eventJSON.previewImage = null
            eventJSON.numAttending = await event.countEventAttendees()
            eventJSON.Group = await event.getGroup({
                attributes: ['id', 'name', 'city', 'state']
            })
            eventJSON.Venue = await event.getVenue({
                attributes: ['id', 'city', 'state']
            })

            allEvents.push(eventJSON)
        }

        res.json({ Events: allEvents })
    })

module.exports = router
