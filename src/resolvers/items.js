const db = require('../models');

module.exports = {
  createItem: async (parent, { input }) => {
    const maxOrdinal = await db.item.max('ordinal');

    const result = await db.item
      .create({ ...input, ordinal: maxOrdinal + 1 })
      .then(item => ({
        data: item
      }))
      .catch(error => ({
        error
      }));

    return result;
  },
  updateItem: (parent, { id, input }) =>
    db.item.update(input, { where: { id } })
};
