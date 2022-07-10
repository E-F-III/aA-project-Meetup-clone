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
      Event.belongsTo(models.Group, { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true })
      Event.belongsTo(models.Venue, { foreignKey: 'venueId', onDelete: 'CASCADE', hooks: true })

      Event.hasMany(models.Image, { foreignKey: 'eventId', as: 'images', onDelete: 'CASCADE', hooks: true })
      Event.hasMany(models.Image, { foreignKey: 'eventId', as: 'previewImage', onDelete: 'CASCADE', hooks: true })
    }
  }
  Event.init({
    groupId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
