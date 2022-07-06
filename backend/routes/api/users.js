const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Member, Image, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
    // const currUser = await User.findByPk(req.user.id)

    // const organized = await currUser.getOrganized()
    // const joined = await currUser.getJoinedGroups({
    //   attributes: {
    //     exclude: ['Members']
    //   }
    // })

    // res.json([...organized, ...joined])

    const organizedGroups = await Group.findAll({
      where: {
        organizerId: req.user.id
      },
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

    const joinedGroups = await Group.findAll({
      include: [
          {
              model: Member,
              attributes: [],
              as: 'members',
              where: {
                memberId: req.user.id
              }
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
              [sequelize.fn('COUNT', sequelize.col('Members.groupId')), 'numMembers'] //count gets thrown off when where attribute is added to the members
          ]
      },
      group: ['Group.id'],
      order: ['id'],
  })
    res.json(joinedGroups)
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
      err.status(403)
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
