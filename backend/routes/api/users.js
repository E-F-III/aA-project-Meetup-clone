const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Member, Image, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  // check('username')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 4 })
  //   .withMessage('Please provide a username with at least 4 characters.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('firstName')
    .isAlpha()
    .withMessage('Please provide a valid name'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('lastName')
    .isAlpha()
    .withMessage('Please provide a valid name'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// GET groups joined or organized by the current User
router.get(
  '/currentUser/groups',
  requireAuth,
  async (req, res, next) => {
    const orgGroups = await Group.findAll({
      where: {
        organizerId: req.user.id
      },
      include: [
        {
          model: Image, // returns an array. clarify during stand up how to properly do this query
          as: 'previewImage',
          attributes: ['url'],
          limit: 1
        },
      ],
    })

    const joinedGroups = await Group.findAll({
      include: [
        {
          model: Image, // returns an array. clarify during stand up how to properly do this query
          as: 'previewImage',
          attributes: ['url'],
          limit: 1
        },
        {
          model: Member,
          as: 'Members',
          attributes: [],
          where: {
            memberId: req.user.id
          }
        }
      ]
    })

    const allGroups = []

    for (let group of orgGroups) {
      const numMembers = await group.countMembers({ where: { status: { [Op.in]: ['member', 'co-host'] }}})
      const groupJSON = group.toJSON()

      groupJSON.numMembers = numMembers
      if (groupJSON.previewImage[0]) groupJSON.previewImage = groupJSON.previewImage[0].url
      allGroups.push(groupJSON)
    }

    for (let group of joinedGroups) {
      const numMembers = await group.countMembers({ where: { status: { [Op.in]: ['member', 'co-host'] }}})
      const groupJSON = group.toJSON()

      groupJSON.numMembers = numMembers
      if (groupJSON.previewImage[0]) groupJSON.previewImage = groupJSON.previewImage[0].url
      allGroups.push(groupJSON)
    }

    res.json(allGroups)
  }
)

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({
      where: {
        email: email
      }
    })

    if (existingUser) {

      const err = new Error('User already exists')
      err.status = 403
      err.status = {}
      err.errors.email = 'User with that email already exists'

      return next(err)
      // return res.status(403).json({
      //   message: "User already exists",
      //   statusCode: 403,
      //   errors: {
      //     email: "User with that email already exists"
      //   }
      // })
    }

    const user = await User.signup({ email, firstName, lastName, password });

    const token = await setTokenCookie(res, user);

    return res.json({
      user, token
    });
  }
);


module.exports = router;
