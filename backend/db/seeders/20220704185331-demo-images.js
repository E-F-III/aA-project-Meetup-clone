'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images',
    [
      {
        url: 'Image 1',
        groupId: 1,
      },
      {
        url: 'Image 2',
        groupId: 1,
      },
      {
        url: 'Image 3',
        groupId: 1,
      },
      {
        url: 'Image 4',
        groupId: 2,
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
