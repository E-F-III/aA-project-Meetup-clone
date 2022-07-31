'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Images',
    [
      {
        url: 'https://www.fodors.com/wp-content/uploads/2019/08/HawaiiHikes__Hero_.jpg',
        groupId: 1,
        userId: 1
      },
      {
        url: 'https://cdn1.matadornetwork.com/blogs/1/2019/02/View-along-the-Na-Pali-Coast-from-the-Kalalau-Trail-in-Kauai-Hawaii-1200x853.jpg',
        groupId: 2,
        userId: 1
      },
      {
        url: 'https://cdn.geekwire.com/wp-content/uploads/2016/06/shutterstock_379103503.jpg',
        groupId: 2,
        userId: 1
      },
      {
        url: 'https://theworldtravelguy.com/wp-content/uploads/2018/12/IMG_7967-3.jpg',
        groupId: 3,
        userId: 2
      },
      {
        url: 'https://t24hs.com/wp-content/uploads/2021/11/1_As8zXL0eSxgLn3vUqAcSjg-2048x1360.jpeg',
        groupId: 3,
        userId: 2
      },
      {
        url: 'https://www.gohawaii.com/sites/default/files/styles/image_gallery_bg_xl/public/hero-unit-images/12719.jpg?itok=tVlTQY5e',
        groupId: 3,
        userId: 2
      },
      {
        url: 'https://theworldtravelguy.com/wp-content/uploads/2018/12/IMG_7960.jpg',
        groupId: 4,
        userId: 2
      },
      {
        url: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0d/5b/a6/db.jpg',
        groupId: 4,
        userId: 2
      },
      {
        url: 'https://www.journeyera.com/wp-content/uploads/2016/09/Tom-Tom-Trail-06868.jpg',
        groupId: 4,
        userId: 2
      },
      {
        url: 'https://images.squarespace-cdn.com/content/v1/5a9df9f4a9e028af26f1eb8c/1647229122841-F67XENUIH2P6AINGH31R/hawaii-packing-list-what-to-pack-for-hawaii-what-to-pack-1.jpg?format=1500w',
        groupId: 4,
        userId: 2
      },
      {
        url: 'https://stayclosetravelfar.com/wp-content/uploads/2019/05/hawaii-crouching-lion-couple-photo.jpg',
        groupId: 5,
        userId: 3
      },
      {
        url: 'https://images.squarespace-cdn.com/content/v1/5a9df9f4a9e028af26f1eb8c/1647230261973-9SLB20N949UUTNE68VPK/hawaii-packing-list-what-to-pack-for-hawaii-what-to-pack-6.jpg',
        groupId: 5,
        userId: 3
      },
      {
        url: 'https://i0.wp.com/culturalfoodies.com/wp-content/uploads/2019/03/Haiku-Stairs.jpg?resize=1140%2C714&ssl=1',
        groupId: 5,
        userId: 3
      },
      {
        url: 'https://i0.wp.com/culturalfoodies.com/wp-content/uploads/2018/03/epb15.jpg?fit=3480%2C2510',
        groupId: 5,
        userId: 3
      },
      {
        url: 'https://i0.wp.com/culturalfoodies.com/wp-content/uploads/2019/03/Kaena-Point1.jpg?fit=3480%2C2510',
        groupId: 5,
        userId: 3
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
