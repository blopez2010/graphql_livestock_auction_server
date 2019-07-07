const { createEvent, deleteEvent, updateEvent } = require('./events');
const { createPeople, updatePeople } = require('./people');
const { createItem, updateItem } = require('./items');
const { createTransaction, updateTransaction, payTransaction } = require('./transactions');
const { login } = require('./login');

module.exports = {
  createEvent,
  deleteEvent,
  updateEvent,
  createPeople,
  updatePeople,
  createItem,
  updateItem,
  createTransaction,
  updateTransaction,
  payTransaction,
  login
};
