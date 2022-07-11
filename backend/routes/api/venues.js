const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, Venue, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, where } = require('sequelize');

const router = express.Router();

router.put(
    '/:venueId',
    requireAuth,
    async (req, res, next) => {
        const venue = await Venue.findByPk(req.params.venueId, {
            attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng']
        })

        if (!venue){
            const err = new Error('Venue couldn\'t be found')
            err.status = 404
            return next(err)
        }

        const group = await venue.getGroup()

        const cohost = await Member.findOne({
            where: {
                groupId: group.id,
                memberId: req.user.id,
                status: 'co-host'
            },
        })

        if (group.organizerId === req.user.id || cohost) {
            const { address, city, state, lat, lng } = req.body
            await venue.set({address, city, state, lat, lng })
            await venue.save()
            res.json(venue)
        } else {
            const err = new Error('Current User must be the organizer or a co-host to edit a venue')
            err.status = 403
            return next(err)
        }
    }

)

module.exports = router
