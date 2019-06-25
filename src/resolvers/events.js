const EventModel = require('../models/event.model');
const ApiError = require('../utils/apiError');
const { raw } = require('objection');

module.exports = {
  createEvent: async (parent, { input }) => {
    const events = await EventModel.query().where(
      raw('YEAR(dateCreated)'),
      '=',
      input.year
    );

    if (events && events.length > 0) {
      return {
        error: {
          message: 'Event is already in place',
          status: 400
        }
      };
    } else {
      const newEvent = await EventModel.query().insert({
        ...input,
        dateCreated: new Date()
      });

      return {
        event: newEvent
      };
    }
  },
  deleteEvent: (parent, { id }) => {
    return EventModel.query().findById(id).then(result => {
      if (!result) {
        return null;
      }
      return EventModel.query().deleteById(id).then(() => ({ id }));
    });
  },
  updateEvent: async (parent, { id, input }) => {
    return await EventModel.query().patchAndFetchById(id, input);
  }
};
