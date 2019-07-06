const EventModel = require('../models/event.model');
const PersonModel = require('../models/person.model');
const ItemModel = require('../models/item.model');

module.exports = {
  Transaction: {
    event(source) {
      if (!source.eventId) {
        return;
      }

      return EventModel.query().findById(source.eventId);
    },
    buyer(source) {
      if (!source.buyerId) {
        return;
      }

      return PersonModel.query().findById(source.buyerId);
    },
    item(source) {
      if (!source.itemId) {
        return;
      }

      return ItemModel.query().findById(source.itemId);
    }
  }
};
