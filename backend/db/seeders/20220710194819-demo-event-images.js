'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Images',
    [
      {
        url: 'Image 16',
        eventId: 1,
      },
      {
        url: 'Image 17',
        eventId: 1,
      },
      {
        url: 'Image 18',
        eventId: 2,
      },
      {
        url: 'Image 19',
        eventId: 2,
      },
      {
        url: 'Image 20',
        eventId: 3,
      },
      {
        url: 'Image 21',
        eventId: 3,
      },
      {
        url: 'Image 22',
        eventId: 4,
      },
      {
        url: 'Image 23',
        eventId: 4,
      },
      {
        url: 'Image 24',
        eventId: 5,
      },
      {
        url: 'Image 25',
        eventId: 5,
      },
      {
        url: 'Image 26',
        eventId: 6,
      },
      {
        url: 'Image 27',
        eventId: 6,
      },
      {
        url: 'Image 28',
        eventId: 7,
      },
      {
        url: 'Image 29',
        eventId: 7,
      },
      {
        url: 'Image 30',
        eventId: 8,
      },
      {
        url: 'Image 31',
        eventId: 8,
      },
      {
        url: 'Image 32',
        eventId: 9,
      },
      {
        url: 'Image 33',
        eventId: 9,
      },
      {
        url: 'Image 34',
        eventId: 10,
      },
      {
        url: 'Image 35',
        eventId: 10,
      },
    ]
    , {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
