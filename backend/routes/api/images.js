const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, Venue, Event, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op, where } = require('sequelize');

const router = express.Router();

//DELETE an image
router.delete(
    '/:imageId',
    requireAuth,
    async (req, res, next) => {
        const image = await Image.findByPk(req.params.imageId)

        if (!image) {
            const err = new Error('Image couldn\'t be found')
            err.status = 404
            return next(err)
        }

        if (image.userId === req.user.id) {
            await image.destroy()
            res.json({message: "Successfully deleted", statusCode: 200})
        } else {
            const err = new Error('Only the owner can delete an image')
            err.status = 403
            return next(err)
        }
    }
)

module.exports = router
