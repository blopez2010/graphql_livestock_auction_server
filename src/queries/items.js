const db = require('../models');
const { itemsAttributes: attributes } = require('../constants');
const sequelize = require('sequelize');
let { paginate, sortBy } = require('./extensions');

const Op = sequelize.Op;

module.exports = {
	allItems: () => db.item.findAll({ attributes }),
	allItemsPaginated: async (parent, { input: { eventId, filter, offset, limit, sortColumn, sortDirection } }) => {
		let where = {
			eventId
		};

		let peopleModel = {
			model: db.people,
			attributes: [ 'id' ]
		};

		let wherePeople = {};

		if (filter) {
			if (!isNaN(filter) && parseInt(filter) > 0) {
				where = {
					...where,
					ordinal: parseInt(filter)
				};
			} else if (filter && filter !== '') {
				//#region People queries
				wherePeople = {
					where: {
						name: {
							[Op.like]: `%${filter.trim()}%`
						}
					}
				};

				const counter = await db.people.count({
					...wherePeople,
					col: 'people.id'
				});

				if (filter && counter > 0) {
					where = {
						[Op.or]: [
							{ ...where },
							{
								description: {
									[Op.like]: `%${filter.trim()}%`
								}
							}
						]
					};

					peopleModel = {
						...peopleModel,
						...wherePeople
					};
				} else {
					where = {
						...where,
						description: {
							[Op.like]: `%${filter.trim()}%`
						}
					};
				}
				//#endregion
			}
		}

		const result = await db.item.findAll({
			attributes,
			where,
			...sortBy(sortColumn, sortDirection, db),
			...paginate({ page: offset, pageSize: limit }),
			include: [ peopleModel ]
		});

		const totalCount = await db.item.count({ attributes, where, include: [ peopleModel ] });

		return {
			items: result,
			totalCount,
			limit,
			offset
		};
	},
	getItemByOrdinal: (parent, { ordinal, eventId }) =>
		db.item.findOne({
			attributes,
			where: {
				ordinal,
				eventId
			}
		}),
	getItemsByOwner: (parent, { ownerId }) =>
		db.item.findAll({
			attributes,
			where: {
				ownerId
			}
		}),
	getItemsByEvent: (parent, { year }) => {
		return db.item.findAll({
			attributes,
			include: [
				{
					model: db.event,
					where: sequelize.where(sequelize.fn('YEAR', sequelize.col('event.createdAt')), year)
				}
			]
		});
	},
	getItemsCountDown: async (parent, { eventId }) => {
		const tempSQL = `select itemId from transactions where eventId = '${eventId}' and isDonated=false`;
		const query = `select count(*) from items where eventId = '${eventId}' and  id not in (${tempSQL})`;

		const countDown = await db.sequelize.query(query, {
			type: sequelize.QueryTypes.SELECT,
			raw: true
		});

		return { count: countDown[0]['count(*)'] };
	},
	getTotalItems: async (parent, { eventId }) => {
		const query = `select count(*) from items where eventId = '${eventId}'`;

		const totalCount = await db.sequelize.query(query, {
			type: sequelize.QueryTypes.SELECT,
			raw: true
		});

		return { count: totalCount[0]['count(*)'] };
	}
};
