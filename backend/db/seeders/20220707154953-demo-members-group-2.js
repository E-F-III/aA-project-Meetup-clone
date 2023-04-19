'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Members'; // define your table name in options object
    return await queryInterface.bulkInsert(options,
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
