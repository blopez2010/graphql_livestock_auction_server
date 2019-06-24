const EventsModel = require('../models/event.model');

module.exports = {
  allEvents: async (parent, args) => await EventsModel.query()
}