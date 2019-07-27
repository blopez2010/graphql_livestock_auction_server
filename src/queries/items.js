const db = require('../models');
const { itemsAttributes: attributes } = require('../constants');
const sequelize = require('sequelize');

module.exports = {
  allItems: (parent, args) => db.item.findAll({ attributes }),
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
  }
};
