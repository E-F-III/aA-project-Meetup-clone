'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Group, { foreignKey: 'groupId' })
      Image.belongsTo(models.Event, { foreignKey: 'eventId' })
      Image.belongsTo(models.Venue, { foreignKey: 'venueId' })
      Image.belongsTo(models.User, { foreignKey: 'userId' })

    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      validate: {
        onlyOneConnection(value) {
          if (value && (this.eventId || this.venueId)) {
            throw new Error ('Image can only be uploaded to one area')
          }
        }
      }
    },
    eventId: {
      type: DataTypes.INTEGER,
      validate: {
        onlyOneConnection(value) {
          if (value && (this.groupId || this.venueId)) {
            throw new Error ('Image can only be uploaded to one area')
          }
        }
      }
    },
    venueId: {
      type: DataTypes.INTEGER,
      validate: {
        onlyOneConnection(value) {
          if (value && (this.eventId || this.groupId)) {
            throw new Error ('Image can only be uploaded to one area')
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
