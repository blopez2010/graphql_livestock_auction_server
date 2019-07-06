const db = require('../models');
const sequelize = require('sequelize');

module.exports = {
  createEvent: async (parent, { input }) => {
    const events = await db.event.findAll({
      where: sequelize.where(
        sequelize.fn('YEAR', sequelize.col('createdAt')),
        input.year
      )
    });

    if (events && events.length > 0) {
      return {
        error: {
          message: 'Event is already in place',
          status: 400
        }
      };
    }

    return await db.event.create(input).then(data => ({
      data
    }));
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
