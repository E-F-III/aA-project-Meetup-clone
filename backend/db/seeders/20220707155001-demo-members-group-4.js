'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Members',
    [
      {
        groupId: 4,
        memberId: 4,
        status: 'co-host'
      },
      {
        groupId: 4,
        memberId: 8,
        status: 'member'
      },
      {
        groupId: 4,
        memberId: 12,
        status: 'member'
      },
      {
        groupId: 4,
        memberId: 16,
        status: 'member'
      },
      {
        groupId: 4,
        memberId: 20,
        status: 'pending'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
