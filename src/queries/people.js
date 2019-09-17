const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  allPeople: (parent, args) => {
    try {
      console.log('GETTING PEOPLE');
      return db.people.findAll();
    } catch (err) {
      console.log('ERROR GETTING PEOPLE', err);
    }
  },
  findPeopleByName: (parent, { name }) => {
    const result = db.people.findAll({
      where: {
        name: {
          [Op.like]: `%${name.trim()}%`
        }
      }
    });

    return result;
  }
};
