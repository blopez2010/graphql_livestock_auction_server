const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define(
    'event',
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    { tableName: 'events' }
  );

  event.associate = models => {
    event.hasMany(models.transaction);
    event.hasMany(models.item);
  };

  event.addHook('beforeCreate', (evt, options) => {
    evt.id = v4();
  });
  return event;
};
