const db = require('../models');
const sequelize = require('sequelize');

module.exports = {
  allEvents: (parent, args) => db.event.findAll(),
  getEventByYear: (parent, { year }) =>
    db.event.findOne({
      where: sequelize.where(
        sequelize.fn('YEAR', sequelize.col('createdAt')),
        year
      )
    })
};
