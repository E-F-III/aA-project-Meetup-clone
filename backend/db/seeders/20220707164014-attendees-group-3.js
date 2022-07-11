'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Attendees', [
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
