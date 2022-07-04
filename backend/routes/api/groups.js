const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, UsersGroup, Image, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const { where } = require('sequelize/types');
// const group = require('../../db/models/group');

const router = express.Router();


//GET a specific group with member count AND information about the organizer
router.get(
    '/:groupId',
    async (req, res, next) => {
        const groupId = req.params.groupId

        const group = await Group.findByPk(groupId, {
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('MembersGroups.id')), 'numMembers'],

                ],
                group: ['UsersGroups.groupId']
            },
            include: [
                {
                    model: User,
                    attributes: [],
                    as: 'MembersGroups',
                },
                'Organizer',
            ],
        })

        const groupJSON = group.toJSON()
        groupJSON.Images = await group.getImages()
        res.json(groupJSON)
    })

//GET all groups with member count
router.get(
    '/',
    async (_req, res, next) => {
        const groups = await Group.findAll({
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('MembersGroups.id')), 'numMembers']
                ]
            },
            include: [
                {
                    model: User,
                    attributes: [],
                    as: 'MembersGroups'
                }
            ],
            group: ['Group.Id'],
        })

        res.json(groups)
    }
)

module.exports = router
