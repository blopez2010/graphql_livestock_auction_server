const db = require('../models');
const sequelize = require('sequelize');

module.exports = {
  allEvents: () => db.event.findAll(),
  getEventByYear: (parent, { year }) =>
    db.event.findOne({
      where: sequelize.where(
        sequelize.fn('YEAR', sequelize.col('createdAt')),
        year
      )
    }),
  getActiveEvent: async () => {
    const result = await db.event.findAll();

    return result.sort((a, b) => {
      const date1 = b.createdAt;
      const date2 = a.createdAt;

      if (date1 < date2) {
        return -1;
      } else if (date1 === date2) {
        return 0;
      } else {
        return 1;
      }
    })[0];
  }
};
