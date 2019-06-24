const BaseModel = require('./base.model');
const { v4 } = require('uuid');
const Item = require('./item.model');
const Transaction = require('./transaction.model');

class Person extends BaseModel {
  static get tableName() {
    return 'events';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'dateCreated', 'isBanned'],

      properties: {
        id: {
          type: 'string',
          minLength: 1,
          maxLength: 36
        },
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 300
        },
        nickname: {
          type: 'string',
          minLength: 1,
          maxLength: 45
        },
        phoneNumber: {
          type: 'string',
          minLength: 1,
          maxLength: 30
        },
        externalIdentifier: {
          type: 'string',
          minLength: 1,
          maxLength: 50
        },
        address: {
          type: 'string',
          minLength: 1,
          maxLength: 2000
        },
        dateCreated: {
          type: 'date'
        },
        isBanned: {
          type: 'boolean'
        },
        bannedDescription: {
          type: 'string',
          minLength: 1,
          maxLength: 500
        }
      }
    };
  }

  static get relationMappings() {
    return {
      items: {
        relation: BaseModel.HasManyRelation,
        modelClass: Item,
        join: {
          from: 'person.id',
          to: 'items.ownerId'
        }
      },
      transactions: {
        relation: BaseModel.HasManyRelation,
        modelClass: Transaction,
        join: {
          from: 'persons.id',
          to: 'transactions.buyerId'
        }
      }
    };
  }

  async $beforeInsert(queryContext) {
    this.id = v4();
    await super.$afterInsert(queryContext);
  }
}

module.exports = Person;
