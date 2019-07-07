const db = require('../models');
const { itemsAttributes: attributes } = require('../constants');

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
    })
};
