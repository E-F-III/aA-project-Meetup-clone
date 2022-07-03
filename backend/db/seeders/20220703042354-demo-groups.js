'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups',
      [
        {
          organizerId: 1,
          name: "Evening Tennis on the Water",
          about: "Enjoy rounds of tennis with a tight-nit group of people on the water.",
          type: "In person",
          private: true,
          city: "New York",
          state: "NY",
        },
        {
          organizerId: 1,
          name: "Evening Water on the Tennis",
          about: "Enjoy rounds of water with a tight-nit group of people on the tennis.",
          type: "Online",
          private: false,
          city: "New York",
          state: "NY",
        },
        {
          organizerId: 2,
          name: "Tennis Water on the Evening",
          about: "Enjoy rounds of tennis water with a tight-nit group of people on the evening.",
          type: "In person",
          private: true,
          city: "Honolulu",
          state: "HI",
        },
      ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      name: { [Op.in]: ['Evening Tennis on the Water', 'Evening Eater on the Tennis', 'Tennis Water on the Evening'] }
    }, {});
  }
};
