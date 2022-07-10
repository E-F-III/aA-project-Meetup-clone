'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendee.belongsTo(models.User, { foreignKey: 'userId' })
      Attendee.belongsTo(models.Event, { foreignKey: 'eventId' })
    }
  }
  Attendee.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        validStatus(value){
          let validStatuses = ['waitlist', 'member', 'pending']
          if (!validStatuses.includes(value)) {
            throw new Error('Status has to be either waitlist, member, or pending')
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};
