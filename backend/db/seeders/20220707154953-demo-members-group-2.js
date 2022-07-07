'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Members',
    [
      {
        groupId: 2,
        memberId: 2,
        status: 'co-host'
      },
      {
        groupId: 2,
        memberId: 4,
        status: 'co-host'
      },
      {
        groupId: 2,
        memberId: 6,
        status: 'member'
      },
      {
        groupId: 2,
        memberId: 8,
        status: 'member'
      },
      {
        groupId: 2,
        memberId: 10,
        status: 'member'
      },
      {
        groupId: 2,
        memberId: 12,
        status: 'member'
      },
      {
        groupId: 2,
        memberId: 14,
        status: 'member'
      },
      {
        groupId: 2,
        memberId: 16,
        status: 'member'
      },
      {
        groupId: 2,
        memberId: 18,
        status: 'pending'
      },
      {
        groupId: 2,
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
