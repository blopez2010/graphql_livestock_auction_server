const { allEvents, getEventByYear } = require('./events');
const { allPersons, filterPersonByName } = require('./persons');
const { allItems, getItemByOrdinal, getItemsByOwner } = require('./items');

module.exports = {
  allEvents,
  getEventByYear,
  allPersons,
  filterPersonByName,
  allItems,
  getItemByOrdinal,
  getItemsByOwner
};