const pubsub = require('../utils/subscription');
const db = require('../models');
const { itemsAttributes: attributes, actions } = require('../constants');

module.exports = {
  createItem: async (parent, { input }, context) => {
    const items = await db.item.findAll({
      attributes: ['ordinal'],
      where: { eventId: input.eventId },
    });
    const maxOrdinal = items && items.length > 0 ? Math.max(...items.map(x => x.ordinal)) : 0;

    const result = await db.item
      .create({ ...input, ordinal: maxOrdinal + 1 })
      .then(item => ({
        data: item,
      }))
      .catch(error => ({
        error,
      }));
    pubsub.publish(actions.itemAdded, { itemAdded: result.data });
    return result;
  },
  updateItem: async (parent, { id, input }) => {
    await db.item.update(input, { where: { id } });
    return await db.item.findOne({ attributes, where: { id } });
  },
};
