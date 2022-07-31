'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Images',
    [
      {
        url: 'https://www.journeyera.com/wp-content/uploads/2016/05/DSC02224-scaled-1024x683.jpg',
        eventId: 1,
        userId: 1
      },
      {
        url: 'https://bordersandbucketlists.com/wp-content/uploads/2019/11/Koko-Head-Hike-1.jpg',
        eventId: 1,
        userId: 2
      },
      {
        url: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/94/88/84.jpg',
        eventId: 2,
        userId: 3
      },
      {
        url: 'http://camping.ehawaii.gov/camping/resources/spc,resource,57855,p,1,null,DH1.jpg',
        eventId: 2,
        userId: 4
      },
      {
        url: ' https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/64/aa/19/manoa-falls.jpg?w=1200&h=1200&s=1',
        eventId: 3,
        userId: 4
      },
      {
        url: 'https://www.hawaii-guide.com/images/made/manoa-falls-hike-oahu_2500_846_95_s_1600_541_95_s_c1_c_b_0_0.jpg',
        eventId: 3,
        userId: 5
      },
      {
        url: 'https://www.journeyera.com/wp-content/uploads/2022/01/kuliouou-ridge-trail-hike-3061-768x1024.jpg.webp',
        eventId: 4,
        userId: 6
      },
      {
        url: 'https://i.ytimg.com/vi/ubhGK7D3i6c/maxresdefault.jpg',
        eventId: 4,
        userId: 8
      },
      {
        url: 'https://www.best-of-oahu.com/images/Makapuu-Lighthouse.jpg',
        eventId: 5,
        userId: 9
      },
      {
        url: 'https://www.hawaii.com/wp-content/uploads/2022/01/GettyImages-698083892.jpg',
        eventId: 5,
        userId: 12
      },
      {
        url: 'https://www.honolulumagazine.com/wp-content/uploads/data-import/6550bd02/hike-of-the-month-aiea-loop-view.jpg',
        eventId: 6,
        userId: 15
      },
      {
        url: 'https://www.journeyera.com/wp-content/uploads/2022/01/aiea-loop-trail-oahu-02785-1200x800.jpg',
        eventId: 6,
        userId: 3
      },
      {
        url: 'https://1lifeonearth.com/wp-content/uploads/2017/04/DSC_7533-2500-7-.jpg',
        eventId: 7,
        userId: 16
      },
      {
        url: 'https://images.squarespace-cdn.com/content/v1/5577dc40e4b030467b0e08b6/1494982605575-PCCA7N9Z7FFP5OE0YVLD/IMG_1325.jpg?format=1000w',
        eventId: 7,
        userId: 20
      },
      {
        url: 'https://www.best-of-oahu.com/images/Lanikai-Pillbox-3.jpg',
        eventId: 8,
        userId: 8
      },
      {
        url: 'https://www.journeyera.com/wp-content/uploads/2016/03/untitled-5-1024x683.jpg.webp',
        eventId: 8,
        userId: 12
      },
      {
        url: 'https://thistraveldream.com/wp-content/uploads/2021/11/Wiliwilinui-Ridge-Trail-1.jpg',
        eventId: 9,
        userId: 5
      },
      {
        url: 'https://images.squarespace-cdn.com/content/v1/5a9df9f4a9e028af26f1eb8c/31ec53de-ca51-4d17-89bf-8f23bd4a10a6/wiliwilinui-ridge-trail-sunset-hikes-in-oahu-stairs-uprooted-traveler.jpg',
        eventId: 9,
        userId: 10
      },
      {
        url: '  https://free4kwallpapers.com/uploads/originals/2015/12/30/waimano-falls-hawaii-wallpaper.jpg',
        eventId: 10,
        userId: 5
      },
      {
        url: 'https://routeofadventure.com/wp-content/uploads/2021/07/20210727_095134.jpg',
        eventId: 10,
        userId: 10
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
