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
