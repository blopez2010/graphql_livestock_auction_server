const db = require('../models');
const { itemsAttributes: attributes } = require('../constants');

module.exports = {
  Item: {
    event(source) {
      if (!source.eventId) {
        return;
      }

      return db.event.findOne({
        attributes,
        where: {
          id: source.eventId
        }
      });
    },
    owner(source) {
      if (!source.ownerId) {
        return;
      }

      return db.people.findOne({
        where: {
          id: source.ownerId
        }
      });
    }
  }
};
