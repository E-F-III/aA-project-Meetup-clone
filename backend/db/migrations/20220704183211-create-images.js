'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      groupId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        defaultValue: null,
        references: {
          model: 'Groups',
          key: 'id'
        }
      },
      eventId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        defaultValue: null,
        // references: {
        //   model: 'Events',
        //   key: 'id'
        // }
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        defaultValue: null,
        // references: {
        //   model: 'Venues',
        //   key: 'id'
        // }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  }
};
