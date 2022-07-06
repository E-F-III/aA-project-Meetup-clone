const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Member, Image, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
// const { where } = require('sequelize/types');
// const group = require('../../db/models/group');

const router = express.Router();

const validateGroup = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 60 })
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({ min: 50 })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['Online', 'In person'])
        .withMessage('Type must be Online or In person'),
    check('private')
        .exists({ checkFalsy: true })
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 2 })
        .withMessage('State is required'),
    handleValidationErrors
]

//GET members of a group
router.get(
    '/:groupId/members',
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        const members = await group.getMembers({
            attributes: {
                exclude: ['GroupId', 'UserId']
            }
        })

        res.json({Members: members})

        // const members = await User.findAll({
        //     attributes: {
        //         include: [
        //             [
        //                 sequelize.literal(`(
        //                     SELECT status
        //                     FROM Members AS Member
        //                     WHERE
        //                         Member.memberId = User.id
        //                         AND
        //                         Member.groupId = ${req.params.groupId}
        //                 )`),
        //                 'membership'
        //             ]
        //         ]
        //     },
        //     where: {
        //         membership: {
        //             [Op.not]: null
        //         }
        //     }
        // })
        // console.log(members)
        // res.json(members)
    }
)

//GET a specific group
router.get(
    '/:groupId',
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        if (!group){
            const err = new Error ('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }

        // LAZY LOADING INFORMATION
        const groupJSON = group.toJSON()

        groupJSON.numMembers = await group.countGroupMembers()
        groupJSON.images = await group.getImages()
        groupJSON.Organizer = await group.getOrganizer()

        res.json(groupJSON)
    }
)

//EDIT a specific group
router.put(
    '/:groupId',
    requireAuth,
    validateGroup,
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        //Group cannot be found
        if (!group){
            const err = new Error ('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }
        //Only the owner can edit the group
        if (group.organizerId !== req.user.id) {
            const err = new Error('You must be the owner to edit this group')
            err.status = 403
            return next(err)
        }

        const { name, about, type, private, city, state } = req.body

        group.set({
            name: name,
            about: about,
            type: type,
            private: private,
            city: city,
            state: state
        })

        group.save()

        res.json(group)
    }
)

//DELETE a group
router.delete(
    '/:groupId',
    requireAuth,
    async (req, res, next) => {
        const group = await Group.findByPk(req.params.groupId)

        //Group cannot be found
        if (!group){
            const err = new Error ('Group couldn\'t be found')
            err.status = 404
            return next(err)
        }
        //Only the owner can delete the group
        if (group.organizerId !== req.user.id) {
            const err = new Error('You must be the owner to delete this group')
            err.status = 403
            return next(err)
        }

        await group.destroy()

        res.status(200).json({message: "Successfully deleted", statusCode: 200})
    }
)

//POST a new group
router.post(
    '/',
    requireAuth,
    validateGroup,
    async (req, res, next) => {
        const { name, about, type, private, city, state } = req.body
        const newGroup = await Group.create({
            organizerId: req.user.id,
            name,
            about,
            type,
            private,
            city,
            state
        })

        res.json(newGroup)
    }
)

//GET all groups with member count
router.get(
    '/',
    async (_req, res, next) => {
        // EAGER LOADING WITH numMembers. ADDING MORE INCLUDES BREAKS THE COUNT
        const groups = await Group.findAll({
            include: [
                {
                    model: Member,
                    attributes: [],
                    as: 'members'
                },
                {
                    model: Image, // returns an array. clarify during stand up how to properly do this query
                    as: 'previewImage',
                    attributes: ['url'],
                    limit: 1
                 },
            ],
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Members.groupId')), 'numMembers']
                ]
            },
            group: ['Group.id'],
            order: ['id'],
        })

        res.json(groups)
    }
)

module.exports = router
