'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Attendees'; // define your table name in options object
    return await queryInterface.bulkInsert(options, [
      {
        userId: 2,
        eventId: 3,
        status: 'member'
      },
      {
        userId: 4,
        eventId: 3,
        status: 'member'
      },
      {
        userId: 6,
        eventId: 3,
        status: 'member'
      },
      {
        userId: 8,
        eventId: 3,
        status: 'member'
      },
      {
        userId: 10,
        eventId: 3,
        status: 'member'
      },
      {
        userId: 12,
        eventId: 3,
        status: 'member'
      },
      {
        userId: 14,
        eventId: 3,
        status: 'member'
      },
      {
        userId: 16,
        eventId: 3,
        status: 'member'
      },
      {
        userId: 18,
        eventId: 3,
        status: 'member'
      },
      {
        userId: 20,
        eventId: 3,
        status: 'member'
      },
      {
        userId: 2,
        eventId: 4,
        status: 'member'
      },
      {
        userId: 4,
        eventId: 4,
        status: 'member'
      },
      {
        userId: 6,
        eventId: 4,
        status: 'member'
      },
      {
        userId: 8,
        eventId: 4,
        status: 'member'
      },
      {
        userId: 10,
        eventId: 4,
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
