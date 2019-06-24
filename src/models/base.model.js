const { Model } = require('objection');
const { forIn } = require('lodash');

class BaseModel extends Model {
  $parseDatabaseJson(json) {
    const response = super.$parseDatabaseJson(json);

    Object.keys(json).forEach(prop => {
      if (prop.format === 'date-time') {
        response[prop] = response[prop] && new Date(response[prop]);
      }
    });

    return response;
  }

  $set(obj) {
    super.$set(obj);

    forIn(this.constructor.jsonSchema.properties, (value, key) => {
      if (value.format === 'date-time' && this[key]) {
        this[key] = new Date(this[key]);
      }
    });
  }

  // async $beforeUpdate(opt, queryContext) {
  //   this.updatedAt = new Date();
  //   // this.name = undefined;
  //   await super.$beforeUpdate(opt, queryContext);
  // }
}

module.exports = BaseModel;
