const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Member, Image, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

router.delete(
    '/:imageId',
    requireAuth,
    async (req, res, next) => {
        const image = Image.findByPk(req.params.imageId)

        if (!image){
            const err = new Error('Image couldn\'t be found')
            err.status = 404
            return next(err)
        }

        if (image.userId !== req.user.id){
            const err = new Error('Only the owner of the image can delete an image')
            err.status = 403
            return next(err)
        }

        await image.destroy()

        res.json({
            message: "Successfully deleted",
            statusCode: 200
          }
          )
    }
)

module.exports = router;
