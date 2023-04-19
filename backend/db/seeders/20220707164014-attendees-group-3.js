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
        userId: 3,
        eventId: 5,
        status: 'member'
      },
      {
        userId: 6,
        eventId: 5,
        status: 'member'
      },
      {
        userId: 9,
        eventId: 5,
        status: 'member'
      },
      {
        userId: 12,
        eventId: 5,
        status: 'member'
      },
      {
        userId: 15,
        eventId: 5,
        status: 'member'
      },
      {
        userId: 18,
        eventId: 5,
        status: 'waitlist'
      },
      {
        userId: 21,
        eventId: 5,
        status: 'pending'
      },
      {
        userId: 3,
        eventId: 6,
        status: 'member'
      },
      {
        userId: 6,
        eventId: 6,
        status: 'member'
      },
      {
        userId: 9,
        eventId: 6,
        status: 'member'
      },
      {
        userId: 12,
        eventId: 6,
        status: 'member'
      },
      {
        userId: 15,
        eventId: 6,
        status: 'member'
      },
      {
        userId: 18,
        eventId: 6,
        status: 'waitlist'
      },
      {
        userId: 21,
        eventId: 6,
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
