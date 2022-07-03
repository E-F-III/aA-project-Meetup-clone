const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, UsersGroup, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get(
    '/',
    async (_req, res, next) => {
        const groups = await Group.findAll({
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Users.id')), 'numMembers']
                ]
            },
            include: [
                {
                    model: User,
                    attributes: []
                }
            ],
            group: ['groupId']
        })

        res.json(groups)
    }
)

module.exports = router
