'use strict';
const { Model } = require('sequelize');
const Group = require('./group');
const User = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.belongsTo(models.User, { foreignKey: 'memberId' })
      Member.belongsTo(models.Group, { foreignKey: 'groupId' })
    }
  }
  Member.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   // model: 'Groups',
      //   model: Group,
      //   key: 'id'
      // }
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   // model: 'Users',
      //   model: User,
      //   key: 'id'
      // }
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        validStatus(value){
          let validStatuses = ['co-host', 'member', 'pending']
          if (!validStatuses.includes(value)) {
            throw new Error('Status has to be either co-host, member, or pending')
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};
