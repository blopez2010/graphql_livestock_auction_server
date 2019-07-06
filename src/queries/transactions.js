// const TransactionModel = require('../models/transaction.model');

// module.exports = {
//   allTransactions: async (parent, args) => {
//     const result = await TransactionModel.query();
//     return await TransactionModel.query();
//   },
//   getTransactionsByBuyer: (parent, { name }) => {
//     return TransactionModel.query()
//       .joinRelation('persons')
//       .where('persons.name', 'like', `%${name.trim()}%`);
//   },
//   getTransactionsByEvent: (parent, { eventId }) => {
//     return TransactionModel.query().where({
//       eventId
//     });
//   },
//   getTotalsByEvent: (parent, { eventId }) => {
//     return TransactionModel.query()
//       .where({
//         eventId
//       })
//       .sum('amount');
//   }
// };
