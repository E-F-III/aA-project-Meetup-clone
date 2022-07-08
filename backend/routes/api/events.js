const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, Event, Attendee, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateEvent = [

]

// POSTING a IMAGE to an event
router.get(
    '/:eventId/images',
    requireAuth,
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.groupId)

        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }


        //Only an attendee can add images
        const attendance = await Attendee.findOne({
            where: {
                eventId: req.params.eventId,
                userId: req.user.id
            },
        })

        if (!attendance || attendance.status !== 'member'){
            const err = new Error('Only an attendee may add an images to an event')
            err.status = 403
            return next(err)
        }

        const newImage = Image.create({
            url: req.body.url,
            eventId: req.params.eventId
        })

        res.json() // what do i send back?

    }
)

//DELETE a attendance
router.delete(
    '/:eventId/attendees',
    requireAuth,
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId)
        // check if event exists
        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const group = await event.getGroup()
        const attendance = await Attendee.findOne({
            where: {
                eventId: req.params.eventId,
                userId: req.body.userId
            },
        })
        const currentUserMembership = await Member.findOne({
            where: {
                groupId: event.groupId,
                memberId: req.user.id
            },
        })
        // check if attendance exists
        if(!attendance){
            const err = new Error('Attendance does not exist for this User')
            err.status = 404
            return next(err)
        }
        //check if current user is either organizer or the member
        if (req.user.id !== group.organizerId && req.user.id !== req.body.userId){
            const err = new Error('Only the User or organizer may delete an Attendance')
            err.status = 403
            return next(err)
        }

        await attendance.destroy()
        res.json({
            message: "Successfully deleted attendance from event"
          })

    }
)

//PUT a attendance from pending to member/waitlist
router.put(
    '/:eventId/attendees',
    requireAuth,
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId)
        // check if event exists
        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const group = await event.getGroup()
        const attendance = await Attendee.findOne({
            where: {
                eventId: req.params.eventId,
                userId: req.body.userId
            },
            attributes: ['id', 'eventId', 'userId', 'status']
        })
        const currentUserMembership = await Member.findOne({
            where: {
                groupId: event.groupId,
                memberId: req.user.id
            },
        })

        // check if attendance request exists
        if(!attendance){
            const err = new Error('Attendance between the user and the event does not exist')
            err.status = 404
            return next(err)
        }
        // cannot change a status to pending
        if (req.body.status === 'pending'){
            const err = new Error('Cannot change a membership status to pending')
            err.status = 400
            return next(err)
        }
        //current user has to be either an organizer or a co-host to change attendance
        if (!currentUserMembership && group.organizerId !== req.user.id) {
            const err = new Error('Current User must be the organizer or a co-host to make someone a member')
            err.status = 403
            return next(err)
        }
        if (group.organizerId !== req.user.id && currentUserMembership.status !== 'co-host') {
            const err = new Error('Current User must be the organizer or a co-host to make someone a member')
            err.status = 403
            return next(err)
        }

        attendance.status = req.body.status
        await attendance.save()

        res.json(attendance)
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
