const db = require('../models');
const Person = require('../models/person');
const sequelize = require('sequelize');
const Op = sequelize.Op;

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
  'buyerId',
  'description'
];

module.exports = {
  allTransactions: async (parent, args) =>
    db.transaction.findAll({ attributes }),
  getTransactionsByBuyer: (parent, { name }) => {
    return db.transaction.findAll({
      attributes,
      include: [
        {
          model: Person,
          where: {
            name: {
              [Op.like]: `%${name.trim()}%`
            }
          }
        }
      ]
    });
  },
  getTransactionsByEvent: (parent, { eventId }) => {
    return db.transaction.findAll({
      attributes,
      where: {
        eventId
      }
    });
  },
  getTotalsByEvent: async (parent, { eventId }) => {
    const result = await db.transaction.findAll({
      attributes: [
        [sequelize.fn('sum', sequelize.col('amount')), 'total']
      ],
      raw: true,
      where: {
        eventId
      }
    });

    return { total: result[0].total };
  }
};
