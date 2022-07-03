const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, UsersGroup, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const { where } = require('sequelize/types');
const group = require('../../db/models/group');

const router = express.Router();


//GET a specific group with member count AND information about the organizer
router.get(
    '/:groupId',
    async (req, res, next) => {
        const groupId = req.params.groupId

        const group = await Group.findByPk(groupId, {
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Users.id')), 'numMembers'],

                ]
            },
            include: [
                {
                    model: User,
                    attributes: []
                },
                'Organizer'
            ],
            group: ['groupId']
        })

        res.json(group)
    })

//GET all groups with member count
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
                    attributes: [],
                }
            ],
            group: ['groupId']
        })

        res.json(groups)
    }
)

module.exports = router
