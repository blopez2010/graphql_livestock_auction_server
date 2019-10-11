const db = require('../models');
const People = require('../models/people');
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
	allTransactions: async () => db.transaction.findAll({ attributes }),
	getTransactionsByBuyer: (parent, { name }) =>
		db.transaction.findAll({
			attributes,
			include: [
				{
					model: People,
					where: {
						name: {
							[Op.like]: `%${name.trim()}%`
						}
					}
				}
			]
		}),
	getTransactionsByEvent: (parent, { eventId }) =>
		db.transaction.findAll({
			attributes,
			where: {
				eventId
			}
		}),
	getTotalsByEvent: async (parent, { eventId }) => {
		const result = await db.transaction.findAll({
			attributes: [ [ sequelize.fn('sum', sequelize.col('amount')), 'total' ] ],
			raw: true,
			where: {
				eventId
			}
		});

		return { total: result[0].total };
	}
};
