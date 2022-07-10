const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, Event, Venue, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateEvent = []

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
