const db = require('../models');

module.exports = {
  createPeople: async (parent, { input }) =>
    db.people.create(input).then(data => ({ data })),
  updatePeople: async (parent, { id, input }) => {
    await db.people.update(input, { where: { id } });
    return await db.people.findOne({ where: { id } });;
  }
};
