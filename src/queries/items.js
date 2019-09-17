const db = require('../models');
const { itemsAttributes: attributes } = require('../constants');
const sequelize = require('sequelize');

module.exports = {
  allItems: () => db.item.findAll({ attributes }),
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
          where: sequelize.where(
            sequelize.fn('YEAR', sequelize.col('event.createdAt')),
            year
          )
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
  },
};
