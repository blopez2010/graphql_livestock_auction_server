const { allEvents, getEventByYear } = require('./events');
const { allPeople, findPeopleByName } = require('./people');
const {
  allItems,
  getItemByOrdinal,
  getItemsByOwner,
  getItemsByEvent
} = require('./items');
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
  getItemsByEvent,
  getItemsByOwner,
  allTransactions,
  getTransactionsByBuyer,
  getTransactionsByEvent,
  getTotalsByEvent
};
