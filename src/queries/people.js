const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  allPeople: (parent, args) => db.people.findAll(),
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
