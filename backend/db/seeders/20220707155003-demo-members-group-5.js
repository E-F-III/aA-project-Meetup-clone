'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Members',
    [
      {
        groupId: 5,
        memberId: 1,
        status: 'member'
      },
      {
        groupId: 5,
        memberId: 5,
        status: 'member'
      },
      {
        groupId: 5,
        memberId: 10,
        status: 'co-host'
      },
      {
        groupId: 5,
        memberId: 15,
        status: 'member'
      },
      {
        groupId: 5,
        memberId: 20,
        status: 'member'
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
