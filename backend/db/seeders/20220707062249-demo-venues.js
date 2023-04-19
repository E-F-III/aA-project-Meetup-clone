'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Venues'; // define your table name in options object
    return await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        address: '1450 Ala Moana Blvd',
        city: 'Honolulu',
        state: 'HI',
        lat: 21.2911,
        lng: 157.8435,
      },
      {
        groupId: 2,
        address: '91-5431 Kapolei Pkwy',
        city: 'Kapolei',
        state: 'HI',
        lat: 21.3336,
        lng: 158.0519,
      },
      {
        groupId: 3,
        address: '92-1185 Aliinui Dr',
        city: 'Kapolei',
        state: 'HI',
        lat: 21.3388,
        lng: 158.1229,
      },
      {
        groupId: 4,
        address: '61-31 Kamehameha Hwy',
        city: 'Haleiwa',
        state: 'HI',
        lat: 21.6389,
        lng: 158.0607,
      },
      {
        groupId: 5,
        address: '99-1849 Aiea Heights Dr',
        city: 'Aiea',
        state: 'HI',
        lat: 21.3986,
        lng: 157.9003,
      },

    ], {});

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
