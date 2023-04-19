'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(options, [
      {
        userId: 4,
        eventId: 7,
        status: 'member'
      },
      {
        userId: 8,
        eventId: 7,
        status: 'member'
      },
      {
        userId: 12,
        eventId: 7,
        status: 'member'
      },
      {
        userId: 16,
        eventId: 7,
        status: 'member'
      },
      {
        userId: 20,
        eventId: 7,
        status: 'member'
      },
      {
        userId: 4,
        eventId: 8,
        status: 'member'
      },
      {
        userId: 8,
        eventId: 8,
        status: 'member'
      },
      {
        userId: 12,
        eventId: 8,
        status: 'member'
      },
      {
        userId: 16,
        eventId: 8,
        status: 'waitlist'
      },
      {
        userId: 20,
        eventId: 8,
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
