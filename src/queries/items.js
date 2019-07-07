const db = require('../models');
const attributes = [
  'id',
  'ownerId',
  'ordinal',
  'description',
  'externalIdentifier',
  'createdAt',
  'updatedAt',
  'eventId'
];

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
