// const TransactionModel = require('../models/transaction.model');
// const moment = require('moment');

// module.exports = {
//   createTransaction: async (parent, { input }) => {
//     const result = await TransactionModel.query().findOne({
//       itemId: input.itemId
//     });
//     if (result) {
//       return {
//         error: {
//           message: 'Item is already taken',
//           status: 400
//         }
//       };
//     }

//     return TransactionModel.query()
//       .insert(input)
//       .then(result => ({
//         data: result
//       }))
//       .catch(error => ({
//         error
//       }));
//   },
//   updateTransaction: async (parent, { id, input }) => {
//     const result = await TransactionModel.query().findOne({
//       itemId: input.itemId
//     });

//     if (result && result.buyerId !== input.buyerId) {
//       return {
//         error: {
//           message: 'Item was already bought by another person',
//           status: 400
//         }
//       };
//     }

//     if (result.isLastBuyer) {
//       return {
//         error: {
//           message: 'Item was already bought by another person',
//           status: 400
//         }
//       };
//     }

//     return TransactionModel.query().patchAndFetchById(id, input);
//   },
//   payTransaction: async (parent, { id, input }) => {
//     if (input.paymentDate) {
//       input.paymentDate = moment(input.paymentDate).toDate();
//     }
//     return await TransactionModel.query().patchAndFetchById(id, input);
//   }
// };
