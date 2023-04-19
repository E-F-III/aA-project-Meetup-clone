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
        groupId: 1,
        memberId: 2,
        status: 'co-host'
      },
      {
        groupId: 1,
        memberId: 3,
        status: 'co-host'
      },
      {
        groupId: 1,
        memberId: 4,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 5,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 6,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 7,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 8,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 9,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 10,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 11,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 12,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 13,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 14,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 15,
        status: 'member'
      },
      {
        groupId: 1,
        memberId: 16,
        status: 'pending'
      },
      {
        groupId: 1,
        memberId: 17,
        status: 'pending'
      },
      {
        groupId: 1,
        memberId: 18,
        status: 'pending'
      },
      {
        groupId: 1,
        memberId: 19,
        status: 'pending'
      },
      {
        groupId: 1,
        memberId: 20,
        status: 'pending'
      },
      {
        groupId: 1,
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
