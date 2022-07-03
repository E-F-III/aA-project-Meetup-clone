'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UsersGroups',
    [
      {
        groupId: 1,
        memberId: 1,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 2,
        status: 'co-host'
      },
      {
        groupId: 2,
        memberId: 3,
        status: 'member'
      },
      {
        groupId: 3,
        memberId: 4,
        status: 'member'
      },
      {
        groupId: 3,
        memberId: 5,
        status: 'co-host'
      },
      {
        groupId: 3,
        memberId: 1,
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
