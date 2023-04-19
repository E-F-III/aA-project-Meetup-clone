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
        userId: 5,
        eventId: 9,
        status: 'member'
      },
      {
        userId: 10,
        eventId: 9,
        status: 'member'
      },
      {
        userId: 15,
        eventId: 9,
        status: 'waitlist'
      },
      {
        userId: 20,
        eventId: 9,
        status: 'pending'
      },
      {
        userId: 5,
        eventId: 10,
        status: 'member'
      },
      {
        userId: 10,
        eventId: 10,
        status: 'member'
      },
      {
        userId: 1,
        eventId: 10,
        status: 'member'
      },
      {
        userId: 15,
        eventId: 10,
        status: 'waitlist'
      },
      {
        userId: 20,
        eventId: 10,
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
