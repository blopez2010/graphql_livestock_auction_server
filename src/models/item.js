'use strict';
const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define(
    'item',
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      ownerId: DataTypes.STRING,
      ordinal: { type: DataTypes.NUMBER, allowNull: false },
      description: DataTypes.STRING,
      externalIdentifier: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );
  item.associate = function(models) {
    item.hasMany(models.transaction);
    item.belongsTo(models.people, { foreignKey: 'ownerId' });
    item.belongsTo(models.event);
  };

  item.addHook('beforeCreate', (item, options) => {
    item.id = v4();
  });
  return item;
};
