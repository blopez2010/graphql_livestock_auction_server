const sequelize = require('sequelize');
const db = require('../models');
const People = require('../models/people');

const { Op } = sequelize;
const { transactionsAttributes } = require('../constants');

const attributes = transactionsAttributes;

module.exports = {
	allTransactions: () => db.transaction.findAll({ attributes }),
	// allTransactionsPaginated: (parent, args) => { console.log(parent, args) },
	allTransactionsPaginated: async (parent, args) => {
		const { filters, offset, limit, sortColumn, sortDirection } = args.input;
		const {
			eventId,
			itemOrdinal,
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
		const where = [];

		if (eventId) {
			where.push(`(eventId = '${eventId}')`);
		}
		
		if (itemOrdinal) {
			where.push(`(itemOrdinal = ${itemOrdinal})`);
		}
		
		if (buyerId) {
			where.push(`(buyerId = '${buyerId}')`);
		}
		
		if (description) {
			where.push(`(description LIKE '%${description}%')`);
		}

		if (amountFrom && amountTo) {
			where.push(`(amount BETWEEN ${amountFrom} AND ${amountTo})`);
		} else if (amountFrom) {
			where.push(`(amount >= ${amountFrom})`);
		} else if (amountTo) {
			where.push(`(amount <= ${amountTo})`);
		}

		if (isDonated !== undefined) {
			where.push(`(isDonated = ${isDonated})`);
		}
		if (isPayed !== undefined) {
			where.push(`(isPayed = ${isPayed})`);
		}
		if (isLastBuyer !== undefined) {
			where.push(`(isLastBuyer = ${isLastBuyer})`);
		}
		
		if (paymentMethod) {
			where.push(`(paymentMethod LIKE '%${paymentMethod}%')`);
		}
		if (paymentReference) {
			where.push(`(paymentReference LIKE '%${paymentReference}%')`);
		}
		if (paymentDateFrom && paymentDateTo) {
			where.push(`(paymentDate BETWEEN '${paymentDateFrom}%' AND '${paymentDateTo}%')`);
		}
		//#endregion

		let query = `SELECT * from transactions_view WHERE`;
		query = `${query} ${where.join(' AND ')}`;
		query = `${query} ORDER BY ${sortColumn} ${sortDirection}`;
		query = `${query} LIMIT ${offset * limit}, ${limit}`;

		const transactions = await db.sequelize.query(query, {
			type: sequelize.QueryTypes.SELECT,
			raw: true
		});

		query = `SELECT COUNT(*) from transactions_view WHERE`
		query = `${query} ${where.join(' AND ')}`;

		const totalCount = await db.sequelize.query(query, {
			type: sequelize.QueryTypes.SELECT,
			raw: true
		});

		return {
			transactions,
			totalCount: totalCount[0]['COUNT(*)'],
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
	},
	getTransactionsBuyersReport: async (parent, { eventId }) => {
		const query = `select * from transactions_view where eventId = '${eventId}'`;
		
		const result = await db.sequelize.query(query, {
			type: sequelize.QueryTypes.SELECT,
			raw: true
		});

		return result;
	},
	getTransactionsDebtorsReport: async (parent, { eventId }) => {
		const query = `select * from transactions_view where eventId = '${eventId}' and isPayed=0`;
		
		const result = await db.sequelize.query(query, {
			type: sequelize.QueryTypes.SELECT,
			raw: true
		});

		return result;
	},
	getTransactionsTotalsReport: async (parent, { startDate, endDate }) => {
		const query = `
			select 
				CONCAT(YEAR(t.createdAt), '-', LPAD(MONTH(t.createdAt), 2, '0'), '-01') as eventDate, 
				'Subasta Ganadera' as description, 
				SUM(t.amount) as total from transactions as t
			where t.createdAt between '${startDate}' and '${endDate}'
			group by CONCAT(YEAR(t.createdAt), '-', LPAD(MONTH(t.createdAt), 2, '0')), 'Subasta Ganadera'
		`;
		
		const result = await db.sequelize.query(query, {
			type: sequelize.QueryTypes.SELECT,
			raw: true
		});

		return result;
	},
};
