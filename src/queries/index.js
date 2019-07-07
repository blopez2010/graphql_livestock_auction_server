const { allEvents, getEventByYear } = require('./events');
const { allPeople, findPeopleByName } = require('./people');
const { allItems, getItemByOrdinal, getItemsByOwner } = require('./items');
const {
  allTransactions,
  getTransactionsByBuyer,
  getTransactionsByEvent,
  getTotalsByEvent
} = require('./transactions');

module.exports = {
  allEvents,
  getEventByYear,
  allPeople,
  findPeopleByName,
  allItems,
  getItemByOrdinal,
  getItemsByOwner,
  allTransactions,
  getTransactionsByBuyer,
  getTransactionsByEvent,
  getTotalsByEvent
};
