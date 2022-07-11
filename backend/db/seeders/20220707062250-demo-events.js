'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Events', [
      {
        groupId: 1,
        venueId: null,
        name: 'Event 1',
        description: '-------------------- about event 1 --------------------',
        type: 'Online',
        capacity: 10,
        price: 18.99,
        startDate: new Date('2022-11-19 20:00:00'),
        endDate: new Date('2022-11-19 21:00:00')
      },
      {
        groupId: 1,
        venueId: 1,
        name: 'Event 2',
        description: '-------------------- about event 2 --------------------',
        type: 'In Person',
        capacity: 20,
        price: 24.99,
        startDate: new Date('2022-12-19 20:00:00'),
        endDate: new Date('2022-12-19 21:00:00')
      },
      {
        groupId: 2,
        venueId: null,
        name: 'Event 3',
        description: '-------------------- about event 3 --------------------',
        type: 'Online',
        capacity: 10,
        price: 18.99,
        startDate: new Date('2022-11-20 20:00:00'),
        endDate: new Date('2022-11-20 21:00:00')
      },
      {
        groupId: 2,
        venueId: 2,
        name: 'Event 4',
        description: '-------------------- about event 4 --------------------',
        type: 'In Person',
        capacity: 20,
        price: 24.99,
        startDate: new Date('2022-12-20 20:00:00'),
        endDate: new Date('2022-12-20 21:00:00')
      },
      {
        groupId: 3,
        venueId: null,
        name: 'Event 5',
        description: '-------------------- about event 5 --------------------',
        type: 'Online',
        capacity: 10,
        price: 18.99,
        startDate: new Date('2022-10-19 20:00:00'),
        endDate: new Date('2022-10-19 21:00:00')
      },
      {
        groupId: 3,
        venueId: 3,
        name: 'Event 6',
        description: '-------------------- about event 6 --------------------',
        type: 'In Person',
        capacity: 20,
        price: 24.99,
        startDate: new Date('2022-9-19 20:00:00'),
        endDate: new Date('2022-9-19 21:00:00')
      },
      {
        groupId: 4,
        venueId: null,
        name: 'Event 7',
        description: '-------------------- about event 7 --------------------',
        type: 'Online',
        capacity: 10,
        price: 18.99,
        startDate: new Date('2022-12-25 20:00:00'),
        endDate: new Date('2022-12-25 21:00:00')
      },
      {
        groupId: 4,
        venueId: 4,
        name: 'Event 8',
        description: '-------------------- about event 8 --------------------',
        type: 'In Person',
        capacity: 20,
        price: 24.99,
        startDate: new Date('2022-10-31 20:00:00'),
        endDate: new Date('2022-10-31 21:00:00')
      },
      {
        groupId: 5,
        venueId: null,
        name: 'Event 9',
        description: '-------------------- about event 9 --------------------',
        type: 'Online',
        capacity: 10,
        price: 18.99,
        startDate: new Date('2022-8-10 20:00:00'),
        endDate: new Date('2022-8-10 21:00:00')
      },
      {
        groupId: 5,
        venueId: 5,
        name: 'Event 10',
        description: '-------------------- about event 10 --------------------',
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
