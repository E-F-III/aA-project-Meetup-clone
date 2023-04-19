'use strict';

let options = {};
options.tableName = 'Members'; // define your table name in options object

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex(options, ['groupId', 'memberId'], { unique: true })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex(options, ['groupId', 'memberId'])
  }
};
