'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Attendees', [
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
