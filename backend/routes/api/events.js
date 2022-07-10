const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, Event, Venue, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateEvent = []


//GET a specific event
// including numAttending, previewImage, Group, and Venus
router.get(
    '/:eventId',
    async (req, res, next) => {
        const event = Event.findByPk(req.params.eventId)

        if (!event){
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }

        res.json(event)
    }
)

//GET all events
// including numAttending, previewImage, Group, and Venus
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

            const numAttending = await event.countAttendees({ where: { status: { [Op.in]: ['member'] }}})
            eventJSON.numAttending = numAttending

            allEvents.push(eventJSON)
        }

        res.json({Events: allEvents})
    })

module.exports = router
