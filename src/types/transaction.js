const db = require('../models');
const { itemsAttributes: attributes } = require('../constants');

module.exports = {
  Transaction: {
    event(source) {
      if (!source.eventId) {
        return;
      }

      return db.event.findOne({
        where: {
          id: source.eventId
        }
      });
    },
    buyer(source) {
      if (!source.buyerId) {
        return;
      }

      return db.people.findOne({
        where: {
          id: source.buyerId
        }
      });
    },
    item(source) {
      if (!source.itemId) {
        return;
      }

      return db.item.findOne({
        attributes,
        where: {
          id: source.itemId
        }
      });
    }
  }
};
