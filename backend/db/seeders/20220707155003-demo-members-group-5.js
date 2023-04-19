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
