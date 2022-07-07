const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, Event, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateEvent = []


//DELETE a specific event
router.delete(
    '/:eventId',
    requireAuth,
    async (req, res, next) => {
        const event = await Event.findByPk(req.params.eventId)
        const group = await event.getGroup()
        const membership = await Member.findOne({
            where: {
                groupId: group.id,
                memberId: req.user.id
            },
        })

        //Event cannot be found
        if (!event) {
            const err = new Error('Event couldn\'t be found')
            err.status = 404
            return next(err)
        }
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
        const event = Event.findByPk(req.params.eventId)

        if (!event) {
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
        const events = await Event.findAll({ attributes: { exclude: ['eventId'] } })

        res.json({ Events: events })
    })

module.exports = router
