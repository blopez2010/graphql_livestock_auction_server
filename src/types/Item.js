const EventModel = require('../models/event.model');
const PersonModel = require('../models/person.model');

module.exports = {
  Item: {
    event(source) {
      if (!source.eventId) {
        return;
      }

      return EventModel.query().findById(source.eventId);
    },
    owner(source) {
      if (!source.ownerId) {
        return;
      }

      return PersonModel.query().findById(source.ownerId);
    }
  }
};
