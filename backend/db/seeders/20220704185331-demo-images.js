'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Images',
    [
      {
        url: 'Image 1',
        groupId: 1,
      },
      {
        url: 'Image 2',
        groupId: 2,
      },
      {
        url: 'Image 3',
        groupId: 2,
      },
      {
        url: 'Image 4',
        groupId: 3,
      },
      {
        url: 'Image 5',
        groupId: 3,
      },
      {
        url: 'Image 6',
        groupId: 3,
      },
      {
        url: 'Image 7',
        groupId: 4,
      },
      {
        url: 'Image 8',
        groupId: 4,
      },
      {
        url: 'Image 9',
        groupId: 4,
      },
      {
        url: 'Image 10',
        groupId: 4,
      },
      {
        url: 'Image 11',
        groupId: 5,
      },
      {
        url: 'Image 12',
        groupId: 5,
      },
      {
        url: 'Image 13',
        groupId: 5,
      },
      {
        url: 'Image 14',
        groupId: 5,
      },
      {
        url: 'Image 15',
        groupId: 5,
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
