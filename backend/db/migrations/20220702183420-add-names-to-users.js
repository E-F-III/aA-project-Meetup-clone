'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      'Users',
      'firstName',
      {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: false
      }
    )
    await queryInterface.addColumn(
      'Users',
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
      'Users',
      'firstName'
    )

    await queryInterface.removeColumn(
      'Users',
      'lastName'
    )
  }
};
