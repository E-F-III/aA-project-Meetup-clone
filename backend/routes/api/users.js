const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, sequelize } = require('../../db/models');

const { check, checkSchema } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const group = require('../../db/models/group');

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
  async (req, res, next) => {
    const currUserId = req.user.id

    const organizedGroups = await Group.findAll({
      where: {
        organizerId: currUserId
      },
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('MembersGroups.Id')), 'numMembers'],
        ]
      },
      include: [
        {
          model: User,
          as: 'MembersGroups',
          attributes: [],
        },
      ],
      group: ['Group.Id']
    })

    const joinedGroups = await User.findByPk(currUserId, {
      include: [
        {
          model: Group,
          as: 'MembersGroups',
        }
      ],
      attributes: []
    })

    const allGroups = [...organizedGroups, ...joinedGroups.MembersGroups]
      res.json(allGroups)
  }
)

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({
      where: {
        email: email
      }
    })

    if (existingUser) {
      return res.status(403).json({
        message: "User already exists",
        statusCode: 403,
        errors: {
          email: "User with that email already exists"
        }
      })
    }

    const user = await User.signup({ email, firstName, lastName, password });

    const token = await setTokenCookie(res, user);

    return res.json({
      user, token
    });
  }
);


module.exports = router;
