const BaseModel = require('./base.model');
const { v4 } = require('uuid');
const Person = require('./person.model');
const Transaction = require('./transaction.model');
const Event = require('./event.model');

class Item extends BaseModel {
  static get tableName() {
    return 'items';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['ownerId', 'ordinal'],

      properties: {
        id: {
          type: 'string',
          minLength: 1,
          maxLength: 36
        },
        eventId: {
          type: 'string',
          minLength: 1,
          maxLength: 36
        },
        ordinal: {
          type: 'integer'
        },
        description: {
          type: 'string',
          minLength: 1,
          maxLength: 500
        },
        externalIdentifier: {
          type: 'string',
          minLength: 1,
          maxLength: 100
        },
        ownerId: {
          type: 'string',
          minLength: 1,
          maxLength: 36
        },
        dateCreated: {
          type: 'date'
        }
      }
    };
  }

  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: 'items.ownerId',
          to: 'persons.id'
        }
      },
      events: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Event,
        join: {
          from: 'items.eventId',
          to: 'events.id'
        }
      },
      transactions: {
        relation: BaseModel.HasManyRelation,
        modelClass: Transaction,
        join: {
          from: 'items.id',
          to: 'transactions.itemId'
        }
      }
    };
  }

  async $beforeInsert(queryContext) {
    this.id = v4();
    this.dateCreated = new Date();
    await super.$afterInsert(queryContext);
  }
}

module.exports = Item;
