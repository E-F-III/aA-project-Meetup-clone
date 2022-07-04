'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        // username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'Lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        // username: 'FakeUser1',
        firstName: 'Fake',
        lastName: 'Userone',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        // username: 'FakeUser2',
        firstName: 'Fake',
        lastName: 'Usertwo',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user3@user.io',
        firstName: 'Fake',
        lastName: 'Userthree',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.io',
        firstName: 'Fake',
        lastName: 'Userfour',
        hashedPassword: bcrypt.hashSync('password3')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['demo@user.io', 'user1@user.io', 'user2@user.io', 'user3@user.io', 'user4@user.io'] }
    }, {});
  }
};
