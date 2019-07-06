'use strict';
const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const people = sequelize.define('people', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    externalIdentifier: DataTypes.STRING,
    address: DataTypes.STRING,
    isBanned: DataTypes.BOOLEAN,
    bannedDescription: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  people.associate = (models) => {
    people.hasMany(models.transaction);
    people.hasMany(models.item);
  }

  people.addHook('beforeCreate', (people, options) => {
    people.id = v4();
  })

  return people;
};