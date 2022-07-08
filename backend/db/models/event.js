'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsToMany(models.User, {
        through: 'Attendees',
        foreignKey: 'eventId',
        as: 'eventAttendees'
      })

      Event.belongsTo(models.Group, { foreignKey: 'groupId' })
      Event.belongsTo(models.Venue, { foreignKey: 'venueId' })

      Event.hasMany(models.Attendee, {foreignKey: 'eventId', as: 'attendees'})

      Event.hasMany(models.Image, { foreignKey: 'eventId', as: 'images' })
      Event.hasMany(models.Image, { foreignKey: 'eventId', as: 'previewImage' })
    }
  }
  Event.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        minLengthCheck(value){
          if (value.length < 5){
            throw new Error ('About must be at least 5 characters')
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        OLorIRL(value){
          if (value !== 'In person' && value !== 'Online'){
            throw new Error('Type must be Online or In person')
          }
        }
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
