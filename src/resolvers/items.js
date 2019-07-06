// const ItemModel = require('../models/item.model');

// module.exports = {
//   createItem: async (parent, { input }) => {
//     const maxOrdinal = await ItemModel.query().max('ordinal');
//     const ordinalValue = Object.keys(maxOrdinal[0]).map(
//       key => maxOrdinal[0][key]
//     )[0];

//     const result = await ItemModel.query()
//       .insert({ ...input, ordinal: ordinalValue ? ordinalValue + 1 : 1 })
//       .then(item => ({
//         data: item
//       }))
//       .catch(error => ({
//         error
//       }));

//     return result;
//   },
//   updateItem: (parent, { id, input }) => {
//     return ItemModel.query().patchAndFetchById(id, input);
//   }
// };
