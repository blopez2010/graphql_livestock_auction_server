'use strict';
const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define(
    'transaction',
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      eventId: {
        type: DataTypes.STRING,
        references: 'events',
        referencesKey: 'id'
      },
      itemId: DataTypes.STRING,
      buyerId: DataTypes.STRING,
      description: DataTypes.STRING,
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
    { freezeTableName: true, tableName: 'transactions' }
  );

  transaction.associate = models => {
    transaction.belongsTo(models.event);
    transaction.belongsTo(models.people, {
      foreignKey: 'buyerId'
    });
    transaction.belongsTo(models.item, {
      foreignKey: 'itemId'
    });
  };

  transaction.addHook('beforeCreate', (transaction, options) => {
    transaction.id = v4();
  });

  return transaction;
};
