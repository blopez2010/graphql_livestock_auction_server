const db = require('../models');

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
        where: {
          id: source.itemId
        }
      });
    }
  }
};
