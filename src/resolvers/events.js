const EventModel = require('../models/event.model');

module.exports = {
  createEvent: async (parent, { input }) => {
    return await EventModel.query().insert({
      ...input,
      dateCreated: new Date()
    });
  },
  deleteEvent: (parent, { id }) => {
    return EventModel.query().findById(id).then((result) => {
      if (!result) {
        return null;
      }
      return EventModel.query().deleteById(id).then(() => ({ id }));
    })
  },
  updateEvent: async (parent, { id, input }) => {
    return await EventModel.query().patchAndFetchById(id, input)
  }
};
