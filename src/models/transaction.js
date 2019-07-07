'use strict';
const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define(
    'transaction',
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      eventId: {
        type: DataTypes.STRING,
        references: 'event',
        referencesKey: 'id'
      },
      itemId: {
        type: DataTypes.STRING,
        references: 'item',
        referencesKey: 'id'
      },
      buyerId: {
        type: DataTypes.STRING,
        references: 'people',
        referencesKey: 'id'
      },
      amount: { type: DataTypes.FLOAT, allowNull: false },
      isDonated: DataTypes.BOOLEAN,
      isPayed: DataTypes.BOOLEAN,
      isLastBuyer: DataTypes.BOOLEAN,
      paymentMethod: DataTypes.ENUM('CASH', 'DEPOSIT', 'MONEY_CHECK'),
      paymentReference: DataTypes.STRING,
      paymentDate: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  transaction.associate = models => {
    transaction.belongsTo(models.event);
    transaction.belongsTo(models.people);
    transaction.belongsTo(models.item);
  };

  transaction.addHook('beforeCreate', (transaction, options) => {
    transaction.id = v4();
  });

  return transaction;
};
