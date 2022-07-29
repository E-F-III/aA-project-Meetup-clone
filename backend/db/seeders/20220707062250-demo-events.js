'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Events', [
      {
        groupId: 1,
        venueId: null,
        name: 'Kokohead Lookout',
        description: "Explore this 1.6-mile out-and-back trail near Honolulu, Oahu. Generally considered a challenging route, it takes an average of 1 h 24 min to complete. This is a very popular area for hiking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. You'll need to leave pups at home — dogs aren't allowed on this trail.",
        type: 'In Person',
        capacity: 10,
        price: 18.99,
        startDate: new Date('2022-11-19 20:00:00'),
        endDate: new Date('2022-11-19 21:00:00')
      },
      {
        groupId: 1,
        venueId: 1,
        name: 'Diamond Head',
        description: "Head out on this 1.8-mile out-and-back trail near Honolulu, Oahu. Generally considered an easy route, it takes an average of 1 h 1 min to complete. This is a very popular area for hiking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. You'll need to leave pups at home — dogs aren't allowed on this trail.",
        type: 'In Person',
        capacity: 20,
        price: 24.99,
        startDate: new Date('2022-12-19 20:00:00'),
        endDate: new Date('2022-12-19 21:00:00')
      },
      {
        groupId: 2,
        venueId: null,
        name: 'Manoa Falls',
        description: "Check out this 1.7-mile out-and-back trail near Honolulu, Oahu. Generally considered an easy route, it takes an average of 1 h 9 min to complete. This is a very popular area for hiking and trail running, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime.",
        type: 'In Person',
        capacity: 10,
        price: 18.99,
        startDate: new Date('2022-11-20 20:00:00'),
        endDate: new Date('2022-11-20 21:00:00')
      },
      {
        groupId: 2,
        venueId: 2,
        name: 'Kuliouou Ridge Trail',
        description: "Try this 4.7-mile out-and-back trail near Honolulu, Oahu. Generally considered a moderately challenging route, it takes an average of 3 h 5 min to complete. This is a very popular area for hiking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome and may be off-leash in some areas.",
        type: 'In Person',
        capacity: 20,
        price: 24.99,
        startDate: new Date('2022-12-20 20:00:00'),
        endDate: new Date('2022-12-20 21:00:00')
      },
      {
        groupId: 3,
        venueId: null,
        name: "Makapu'u Point Lighthouse",
        description: "Explore this 2.5-mile out-and-back trail near Waimānalo, Oahu. Generally considered an easy route, it takes an average of 1 h 14 min to complete. This is a very popular area for hiking and walking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome, but must be on a leash.",
        type: 'In Person',
        capacity: 10,
        price: 18.99,
        startDate: new Date('2022-10-19 20:00:00'),
        endDate: new Date('2022-10-19 21:00:00')
      },
      {
        groupId: 3,
        venueId: 3,
        name: 'Aiea Loop Trail',
        description: "Check out this 4.9-mile loop trail near Aiea, Oahu. Generally considered a moderately challenging route, it takes an average of 2 h 47 min to complete. This is a very popular area for hiking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome, but must be on a leash.",
        type: 'In Person',
        capacity: 20,
        price: 24.99,
        startDate: new Date('2022-9-19 20:00:00'),
        endDate: new Date('2022-9-19 21:00:00')
      },
      {
        groupId: 4,
        venueId: null,
        name: 'Olomana Trail',
        description: "Head out on this 4.4-mile out-and-back trail near Kailua, Oahu. Generally considered a challenging route, it takes an average of 3 h 13 min to complete. This is a very popular area for hiking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. You'll need to leave pups at home — dogs aren't allowed on this trail.",
        type: 'In Person',
        capacity: 10,
        price: 18.99,
        startDate: new Date('2022-12-25 20:00:00'),
        endDate: new Date('2022-12-25 21:00:00')
      },
      {
        groupId: 4,
        venueId: 4,
        name: 'Kaiwa Ridge',
        description: "Try this 1.7-mile out-and-back trail near Kailua, Oahu. Generally considered a challenging route, it takes an average of 1 h 8 min to complete. This is a very popular area for hiking, trail running, and walking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome, but must be on a leash.",
        type: 'In Person',
        capacity: 20,
        price: 24.99,
        startDate: new Date('2022-10-31 20:00:00'),
        endDate: new Date('2022-10-31 21:00:00')
      },
      {
        groupId: 5,
        venueId: null,
        name: 'Wiliwilinui Ridge Trail',
        description: "Check out this 4.7-mile out-and-back trail near Honolulu, Oahu. Generally considered a moderately challenging route, it takes an average of 3 h 3 min to complete. This is a very popular area for hiking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome, but must be on a leash.",
        type: 'Online',
        capacity: 10,
        price: 18.99,
        startDate: new Date('2022-8-10 20:00:00'),
        endDate: new Date('2022-8-10 21:00:00')
      },
      {
        groupId: 5,
        venueId: 5,
        name: 'Waimano Falls Trail',
        description: "Try this 2.9-mile out-and-back trail near Pearl City, Oahu. Generally considered a challenging route, it takes an average of 1 h 41 min to complete. This is a very popular area for hiking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome, but must be on a leash.",
        type: 'In Person',
        capacity: 20,
        price: 24.99,
        startDate: new Date('2022-8-17 20:00:00'),
        endDate: new Date('2022-8-17 21:00:00')
      },
    ])
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
