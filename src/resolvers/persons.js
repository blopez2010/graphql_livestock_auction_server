const PersonModel = require('../models/person.model');

module.exports = {
  createPerson: async (parent, { input }) => {
    const result = await PersonModel.query()
      .insert(input)
      .then(person => ({
        data: person
      }))
      .catch(error => ({
        error
      }));

      return result;
  },
  updatePerson: (parent, {id, input}) => {
    return PersonModel.query().patchAndFetchById(id, input);
  }
};
