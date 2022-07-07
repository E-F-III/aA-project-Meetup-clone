'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Attendees', [
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
