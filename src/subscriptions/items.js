const pubsub = require('../utils/subscription');

const ITEM_ADDED = 'ITEM_ADDED';

module.exports = {
  itemAdded: {
    subscribe: () => pubsub.asyncIterator([ITEM_ADDED]),
  },
};
