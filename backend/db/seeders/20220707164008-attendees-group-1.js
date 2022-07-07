'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Attendees', [
      {
        userId: 1,
        eventId: 1,
        status: 'member'
      },
      {
        userId: 2,
        eventId: 1,
        status: 'member'
      },
      {
        userId: 3,
        eventId: 1,
        status: 'member'
      },
      {
        userId: 4,
        eventId: 1,
        status: 'member'
      },
      {
        userId: 5,
        eventId: 1,
        status: 'member'
      },
      {
        userId: 11,
        eventId: 1,
        status: 'member'
      },
      {
        userId: 12,
        eventId: 1,
        status: 'member'
      },
      {
        userId: 13,
        eventId: 1,
        status: 'member'
      },
      {
        userId: 14,
        eventId: 1,
        status: 'member'
      },
      {
        userId: 15,
        eventId: 1,
        status: 'member'
      },
      {
        userId: 6,
        eventId: 1,
        status: 'waitlist'
      },
      {
        userId: 7,
        eventId: 1,
        status: 'waitlist'
      },
      {
        userId: 8,
        eventId: 1,
        status: 'waitlist'
      },
      {
        userId: 9,
        eventId: 1,
        status: 'pending'
      },
      {
        userId: 10,
        eventId: 1,
        status: 'pending'
      },
      {
        userId: 1,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 2,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 3,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 4,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 5,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 11,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 12,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 13,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 14,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 15,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 6,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 7,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 8,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 9,
        eventId: 2,
        status: 'member'
      },
      {
        userId: 10,
        eventId: 2,
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
