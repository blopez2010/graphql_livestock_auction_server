const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { paginate, sortBy } = require('./extensions');

module.exports = {
	allPeoplePaginated: async (parent, { input: { name, offset, limit, sortColumn, sortDirection } }) => {
		const where = name
			? {
					name: {
						[Op.like]: `%${name.trim()}%`
					}
				}
			: {};

		const result = await db.people.findAll({
			where,
			...sortBy(sortColumn, sortDirection),
			...paginate({ page: offset, pageSize: limit })
		});

		const totalCount = await db.people.count({
			where
		});

		return {
			people: result,
			totalCount,
			limit,
			offset
		};
	},
	allPeople: (parent, args) => {
		try {
			return db.people.findAll();
		} catch (err) {
			console.log('ERROR GETTING PEOPLE', err);
		}
	},
	findPeopleByName: (parent, { name }) => {
		return db.people.findAll({
			where: {
				name: {
					[Op.like]: `%${name.trim()}%`
				}
			}
		});
	}
};
