'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Jumba',
        lastName: 'Jookiba',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: 'Nani',
        lastName: 'Pelekai',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        email: 'user2@user.io',
        firstName: 'Lilo',
        lastName: 'Pelekai',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        firstName: 'Pleakley',
        lastName: 'Pelekai',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.io',
        firstName: 'Stitch',
        lastName: 'Pelekai',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user5@user.io',
        firstName: 'David',
        lastName: 'Kawena',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'user6@user.io',
        firstName: 'Cobra',
        lastName: 'Bubbles',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'user7@user.io',
        firstName: 'Mertle',
        lastName: 'Edmonds',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'user8@user.io',
        firstName: 'Captain',
        lastName: 'Gantu',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        email: 'user9@user.io',
        firstName: 'Moses',
        lastName: 'Puloki',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        email: 'user10@user.io',
        firstName: 'Dr',
        lastName: 'Hamsterviel',
        hashedPassword: bcrypt.hashSync('password10')
      },
      {
        email: 'user11@user.io',
        firstName: 'Fake',
        lastName: 'Usereleven',
        hashedPassword: bcrypt.hashSync('password11')
      },
      {
        email: 'user12@user.io',
        firstName: 'Fake',
        lastName: 'Usertwelve',
        hashedPassword: bcrypt.hashSync('password12')
      },
      {
        email: 'user13@user.io',
        firstName: 'Fake',
        lastName: 'Userthirteen',
        hashedPassword: bcrypt.hashSync('password13')
      },
      {
        email: 'user14@user.io',
        firstName: 'Fake',
        lastName: 'Userfourteen',
        hashedPassword: bcrypt.hashSync('password14')
      },
      {
        email: 'user15@user.io',
        firstName: 'Fake',
        lastName: 'Userfifteen',
        hashedPassword: bcrypt.hashSync('password15')
      },
      {
        email: 'user16@user.io',
        firstName: 'Fake',
        lastName: 'Usersixteen',
        hashedPassword: bcrypt.hashSync('password16')
      },
      {
        email: 'user17@user.io',
        firstName: 'Fake',
        lastName: 'Userseventeen',
        hashedPassword: bcrypt.hashSync('password17')
      },
      {
        email: 'user18@user.io',
        firstName: 'Fake',
        lastName: 'Usereighteen',
        hashedPassword: bcrypt.hashSync('password18')
      },
      {
        email: 'user19@user.io',
        firstName: 'Fake',
        lastName: 'Usernineteen',
        hashedPassword: bcrypt.hashSync('password19')
      },
      {
        email: 'user20@user.io',
        firstName: 'Fake',
        lastName: 'Usertwenty',
        hashedPassword: bcrypt.hashSync('password20')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      email: {
        [Op.in]: ['demo@user.io', 'user1@user.io', 'user2@user.io', 'user3@user.io', 'user4@user.io',
        'user5@user.io', 'user6@user.io', 'user7@user.io', 'user8@user.io', 'user9@user.io',
        'user10@user.io', 'user11@user.io', 'user12@user.io', 'user13@user.io', 'user14@user.io',
        'user15@user.io', 'user16@user.io', 'user17@user.io', 'user18@user.io', 'user19@user.io',
        'user20@user.io']
      }
    }, {});
  }
};
