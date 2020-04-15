const pubsub = require('../utils/subscription');
const { actions } = require('../constants');

module.exports = {
  itemAdded: {
    subscribe: () => pubsub.asyncIterator([actions.itemAdded]),
  },
};
