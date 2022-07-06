'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('Members', ['groupId', 'memberId'], { unique: true })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('Members', ['groupId', 'memberId'])
  }
};
