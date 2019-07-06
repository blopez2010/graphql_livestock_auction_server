const db = require('../models');
const sequelize = require('sequelize');

module.exports = {
  createPeople: async (parent, { input }) =>
    db.people.create(input).then(data => ({ data })),
  updatePeople: (parent, { id, input }) =>
    db.people.update(input, { where: { id } })
};
