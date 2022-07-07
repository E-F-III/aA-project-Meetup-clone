'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Members',
    [
      {
        groupId: 3,
        memberId: 3,
        status: 'co-host'
      },
      {
        groupId: 3,
        memberId: 6,
        status: 'member'
      },
      {
        groupId: 3,
        memberId: 9,
        status: 'member'
      },
      {
        groupId: 3,
        memberId: 12,
        status: 'member'
      },
      {
        groupId: 3,
        memberId: 15,
        status: 'member'
      },
      {
        groupId: 3,
        memberId: 18,
        status: 'pending'
      },
      {
        groupId: 3,
        memberId: 21,
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
