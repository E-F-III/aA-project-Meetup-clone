const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, Event, sequelize } = require('../../db/models');

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
        const events = await Event.findAll()

        res.json({Events: events})
    })

module.exports = router
