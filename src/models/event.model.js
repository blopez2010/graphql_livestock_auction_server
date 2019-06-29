const BaseModel = require('./base.model');
const { v4 } = require('uuid');
const Transaction = require('./transaction.model');
const Item = require('./item.model');

class Event extends BaseModel {
  static get tableName() {
    return 'events';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name'
      ],

      properties: {
        id: {
          type: 'string',
          minLength: 1,
          maxLength: 36
        },
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 100
        },
        description: {
          type: 'string',
          minLength: 1,
          maxLength: 500
        },
        dateCreated: {
          type: 'date'
        }
      }
    };
  }

  static get relationMappings() {
    return {
      transactions: {
        relation: BaseModel.HasManyRelation,
        modelClass: Transaction,
        join: {
          from: 'events.id',
          to: 'transactions.eventId'
        }
      },
      items: {
        relation: BaseModel.HasManyRelation,
        modelClass: Item,
        join: {
          from: 'events.id',
          to: 'items.eventId'
        }
      }
    };
  }

  async $beforeInsert(queryContext) {
    this.id = v4();
    await super.$afterInsert(queryContext);
  }
}

module.exports = Event;
