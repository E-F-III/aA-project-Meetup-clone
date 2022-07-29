'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Groups',
      [
        {
          organizerId: 1,
          name: "Fun-day Hikes",
          about: "Members and organizers gather as friends to explore new hikes and enjoy familiar ones alike. At minimum, always come prepared with water and proper hiking shoes. Another highly recommended gear would be spikes for the steep, muddy and/or loose dirt conditions on many trails. They are also very useful for rock hopping up streams to waterfalls.",
          type: "In person",
          private: true,
          city: "Kapolei",
          state: "HI",
          // previewImage: "image url 1"
        },
        {
          organizerId: 1,
          name: "Oahu Hikers and Adventurers",
          about: "Welcome to the OHA! We are an activities group that focuses on outdoor activities, especially hiking. Hawaii offers beautiful views, year-long tropical weather, and the friendliest people on earth. From below sea level to the highest peak on Oahu, we plan to venture throughout this island, leaving no stone unturned, and capture awe-striking views from all angles. We all aim to explore, experience, and cherish everything available to us on this island and make our stay here, whether temporary or permanent extraordinarily memorable. Come on out, soak in the sunshine, feel the breeze, work up a sweat, take in the views, and make lifelong friends with the OHA.",
          type: "In person",
          private: false,
          city: "Ewa Beach",
          state: "HI",
          // previewImage: "image url 2",
        },
        {
          organizerId: 2,
          name: "Honolulu Hiking Group",
          about: "Anyone wanting to go hiking to get what I am getting out of hiking the mountains of Oahu? What am I getting? I'm am getting a feeling of freedom, energizment, spiritual well being, strengthening my body in order to obtain quality longevity and I am more alive than I have ever been and I'm only 80 years young.",
          type: "In person",
          private: true,
          city: "Honolulu",
          state: "HI",
          // previewImage: "image url 3",
        },
        {
          organizerId: 2,
          name: "Hawaii Gamers",
          about: "A group made for gamers to connect with other gamers who are living in Hawaii. This group isnt strictly for gaming events. Members can meet up in person and enjoy life on the island",
          type: "Online",
          private: true,
          city: "Pearl City",
          state: "HI",
          // previewImage: "image url 4",
        },
        {
          organizerId: 3,
          name: "Life on Oahu",
          about: "If you are looking to share enjoyable experiences with others, to have an opportunity to meet and connect with quality people and/or perhaps learn something that helps increase your enjoyment of life, this group may be for you.",
          type: "In person",
          private: true,
          city: "Kaneohe",
          state: "HI",
          // previewImage: "image url 5",
        },
      ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      name: { [Op.in]: ['Fun-day Hikes', 'Oahu Hikers and Adventurers', 'Honolulu Hiking Group', 'Hawaii Gamers', 'Life on Oahu'] }
    }, {});
  }
};
