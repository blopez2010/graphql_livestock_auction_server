'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      isDonated: {
        type: Sequelize.BOOLEAN
      },
      isPayed: {
        type: Sequelize.BOOLEAN
      },
      isLastBuyer: {
        type: Sequelize.BOOLEAN
      },
      paymentMethod: {
        type: Sequelize.ENUM('CASH', 'DEPOSIT', 'MONEY_CHECK')
      },
      paymentReference: {
        type: Sequelize.STRING
      },
      paymentDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transactions');
  }
};