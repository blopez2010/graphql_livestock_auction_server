const ItemModel = require('../models/item.model');
const { raw } = require('objection');

module.exports = {
  allItems: (parent, args) => ItemModel.query(),
  getItemByOrdinal: (parent, { ordinal, eventId }) =>
    ItemModel.query().findOne({
      ordinal,
      eventId
    }),
  getItemsByOwner: (parent, { ownerId }) =>
    ItemModel.query().where('ownerId', '=', ownerId)
};
