'use strict';
const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    id: { type: DataTypes.STRING, primaryKey: true },
    amount: {type: DataTypes.FLOAT, allowNull: false},
    isDonated: {type: DataTypes.BOOLEAN, allowNull: false},
    isPayed: {type: DataTypes.BOOLEAN, allowNull: false},
    isLastBuyer: {type: DataTypes.BOOLEAN, allowNull: false},
    paymentMethod: DataTypes.ENUM('CASH', 'DEPOSIT', 'MONEY_CHECK'),
    paymentReference: DataTypes.STRING,
    paymentDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  transaction.associate = (models) => {
    transaction.belongsTo(models.event);
    transaction.belongsTo(models.people);
    transaction.belongsTo(models.item);
  }

  transaction.addHook('beforeCreate', (transaction, options) => {
    transaction.id = v4();
  })

  return transaction;
};