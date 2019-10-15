const db = require('../models');
const sequelize = require('sequelize');
const moment = require('moment');

module.exports = {
  createEvent: async (parent, { input }) => {
    const { startDate, endDate } = input;
    if (moment(startDate).diff(moment(), 'days') < 0) {
      return {
        error: {
          message: 'Start date should be greater than current date',
          status: 400
        }
      };
    }
    if (moment(endDate).diff(moment(startDate), 'days') < 0) {
      return {
        error: {
          message: 'Start date should be lower than end date',
          status: 400
        }
      };
    }
    return db.event.create(input).then(result => ({ data: result }));
  },
  deleteEvent: (parent, { id }) => {
    return db.event.findOne({ where: { id } }).then(result => {
      if (!result) {
        return null;
      }
      return db.event.destroy({ where: { id } }).then(() => ({ id }));
    });
  },
  updateEvent: async (parent, { id, input }) => {
    return await db.event.update(input, { where: { id } });
  }
};
