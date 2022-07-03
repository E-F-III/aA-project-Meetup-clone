'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('UsersGroups', ['groupId', 'memberId'], { unique: true })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('UsersGroups', ['groupId', 'memberId'])
  }
};
