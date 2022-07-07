const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, Event, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateEvent = []


//GET attendees of a specific event
router.get(
    ':/eventId/attendees',
    async (req, res, next) => {

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
