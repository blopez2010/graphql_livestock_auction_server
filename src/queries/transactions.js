const db = require('../models');
const People = require('../models/people');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { transactionsAttributes } = require('../constants');
const { paginate, sortBy } = require('./extensions');

const attributes = transactionsAttributes;

module.exports = {
	allTransactions: () => db.transaction.findAll({ attributes }),
	// allTransactionsPaginated: (parent, args) => { console.log(parent, args) },
	allTransactionsPaginated: async (parent, args) => {
		const { filters, offset, limit, sortColumn, sortDirection } = args.input;
		const {
			eventId,
			itemId,
			buyerId,
			description,
			amountFrom,
			amountTo,
			isDonated,
			isPayed,
			isLastBuyer,
			paymentMethod,
			paymentReference,
			paymentDateFrom,
			paymentDateTo
		} = filters;

		//#region where clause
		let where = {};

		if (eventId) {
			where = {
				...where,
				eventId
			};
		}

		if (itemId) {
			where = {
				...where,
				itemId
			};
		}

		if (buyerId) {
			where = {
				...where,
				buyerId
			};
		}

		if (description) {
			where = {
				...where,
				description
			};
		}

		if (amountFrom && amountTo) {
			where = {
				...where,
				amount: { [Op.between]: [ amountFrom, amountTo ] }
			};
		} else if (amountFrom) {
			where = {
				...where,
				amount: { [Op.gte]: amountFrom }
			};
		} else if (amountTo) {
			where = {
				...where,
				amount: { [Op.lte]: amountTo }
			};
		}

		if (isDonated !== undefined) {
			where = {
				...where,
				isDonated
			};
		}
		if (isPayed !== undefined) {
			where = {
				...where,
				isPayed
			};
		}
		if (isLastBuyer !== undefined) {
			where = {
				...where,
				isLastBuyer
			};
		}

		if (paymentMethod) {
			where = {
				...where,
				paymentMethod: {
					[Op.like]: `%${paymentMethod}%`
				}
			};
		}
		if (paymentReference) {
			where = {
				...where,
				paymentReference: {
					[Op.like]: `%${paymentReference}%`
				}
			};
		}
		if (paymentDateFrom && paymentDateTo) {
			where = {
				...where,
				paymentDate: {
					[Op.between]: [ paymentDateFrom, paymentDateTo ]
				}
			};
		}
		//#endregion

		const transactions = await db.transaction.findAll({
			attributes,
			where,
			...sortBy(sortColumn, sortDirection),
			...paginate({ page: offset, pageSize: limit })
		});

		const totalCount = await db.transaction.count({
			where
		});

		return {
			transactions,
			totalCount,
			limit,
			offset
		};
	},
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
