const PersonModel = require('../models/person.model');

module.exports = {
  allPersons: (parent, args) => PersonModel.query(),
  filterPersonByName: (parent, { name }) => {
    return PersonModel.query().where('name', 'like', `%${name.trim()}%`);
  }
};
