const EventsModel = require('../models/event.model');
const { raw } = require('objection');

module.exports = {
  allEvents: (parent, args) => EventsModel.query(),
  getEventByYear: (parent, { year }) =>
    EventsModel.query()
      .where(raw('YEAR(dateCreated)'), '=', year)
      .then(result => {
        return result[0];
      })
};
