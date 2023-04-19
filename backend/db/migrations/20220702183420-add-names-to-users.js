'use strict';

let options = {};
options.tableName = 'Users'; // define your table name in options object

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      options,
      'firstName',
      {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: false
      }
    )
    await queryInterface.addColumn(
      options,
      'lastName',
      {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: false
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      options,
      'firstName'
    )

    await queryInterface.removeColumn(
      options,
      'lastName'
    )
  }
};
