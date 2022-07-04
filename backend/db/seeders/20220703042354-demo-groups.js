'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups',
      [
        {
          organizerId: 1,
          name: "GROUP 1",
          about: "-------------------- about group 1 --------------------",
          type: "In person",
          private: true,
          city: "New York",
          state: "NY",
          previewImage: "image url 1"
        },
        {
          organizerId: 1,
          name: "GROUP 2",
          about: "-------------------- about group 2 --------------------",
          type: "Online",
          private: false,
          city: "New York",
          state: "NY",
          previewImage: "image url 2",
        },
        {
          organizerId: 2,
          name: "GROUP 3",
          about: "-------------------- about group 3 --------------------",
          type: "In person",
          private: true,
          city: "Honolulu",
          state: "HI",
          previewImage: "image url 3",
        },
        {
          organizerId: 2,
          name: "GROUP 4",
          about: "-------------------- about group 4 --------------------",
          type: "Online",
          private: true,
          city: "Honolulu",
          state: "HI",
          previewImage: "image url 4",
        },
        {
          organizerId: 3,
          name: "GROUP 5",
          about: "-------------------- about group 5 --------------------",
          type: "In person",
          private: true,
          city: "Los Angeles",
          state: "CA",
          previewImage: "image url 5",
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
