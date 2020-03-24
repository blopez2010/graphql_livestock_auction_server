const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { paginate, sortBy } = require('./extensions');

module.exports = {
	allPeoplePaginated: async (parent, { input: { filter, offset, limit, sortColumn, sortDirection } }) => {
		const where = filter
			? {
					[Op.or]: [
						{ name: { [Op.like]: `%${filter.trim()}%` } },
						{ nickname: { [Op.like]: `%${filter.trim()}%` } },
						{ phoneNumber: { [Op.like]: `%${filter.trim()}%` } },
						{ externalIdentifier: { [Op.like]: `%${filter.trim()}%` } },
						{ address: { [Op.like]: `%${filter.trim()}%` } },
						{ bannedDescription: { [Op.like]: `%${filter.trim()}%` } },
					]
				}
			: {};

		const people = await db.people.findAll({
			where,
			...sortBy(sortColumn, sortDirection),
			...paginate({ page: offset, pageSize: limit })
		});

		const totalCount = await db.people.count({
			where
		});

		return {
			people,
			totalCount,
			limit,
			offset
		};
	},
	allPeople: () => db.people.findAll(),
	findPeopleByName: (parent, { name }) =>
		db.people.findAll({
			where: {
				name: {
					[Op.like]: `%${name.trim()}%`
				}
			}
		}),
	getDonorsReport: async (parent, {eventId}) => {
		const query = `
			select 
				i.id, 
				p.name as ownerName, 
				p.nickname as ownerNickname, 
				p.phoneNumber as ownerPhoneNumber, 
				p.address as ownerAddress,
				i.ordinal as itemOrdinal,
				i.description as itemDescription
			from people as p inner join items as i on p.id = i.ownerId 
			where i.eventId = '${eventId}'`;
		
		const result = await db.sequelize.query(query, {
			type: sequelize.QueryTypes.SELECT,
			raw: true
		});

		return result;
	}
	
};
