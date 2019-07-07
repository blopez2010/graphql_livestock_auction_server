const db = require('../models');
const sequelize = require('sequelize');
const moment = require('moment');

const attributes = [
  'id',
  'amount',
  'isDonated',
  'isPayed',
  'isLastBuyer',
  'paymentMethod',
  'paymentReference',
  'paymentDate',
  'createdAt',
  'updatedAt',
  'eventId',
  'itemId',
  'buyerId'
];

module.exports = {
  createTransaction: async (parent, { input }) => {
    const result = await db.transaction.findOne({
      attributes,
      where: {
        itemId: input.itemId
      }
    });
    if (result) {
      return {
        error: {
          message: 'Item is already taken',
          status: 400
        }
      };
    }

    return db.transaction
      .create(input)
      .then(result => ({
        data: result
      }))
      .catch(error => ({
        error
      }));
  },
  updateTransaction: async (parent, { id, input }) => {
    const result = await db.transaction.findOne({
      attributes,
      where: {
        itemId: input.itemId
      }
    });

    if (result && result.buyerId !== input.buyerId) {
      return {
        error: {
          message: 'Item was already bought by another person',
          status: 400
        }
      };
    }

    if (result.isLastBuyer) {
      return {
        error: {
          message: 'Item was already bought by another person',
          status: 400
        }
      };
    }

    const updateResult = await db.transaction.update(input, { where: { id } });

    if (
      typeof result === 'object' &&
      !!updateResult[0] &&
      typeof updateResult[0] === 'number' &&
      updateResult[0] > 0
    ) {
      return await db.transaction.findOne({
        attributes,
        where: {
          id
        }
      });
    }

    return null;
  },
  payTransaction: async (parent, { id, input }) => {
    if (input.paymentDate) {
      input.paymentDate = moment(input.paymentDate).toDate();
    }

    const result = await db.transaction.update(input, { where: { id } });
    if (
      typeof result === 'object' &&
      !!result[0] &&
      typeof result[0] === 'number' &&
      result[0] > 0
    ) {
      return await db.transaction.findOne({
        attributes,
        where: {
          id
        }
      });
    }

    return null;
  }
};
