'use strict';
const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  event.associate = function(models) {
    event.hasMany(models.transaction);
    event.hasMany(models.item);
  };

  event.addHook('beforeCreate', (event, options) => {
    event.id = v4();
  });
  return event;
};