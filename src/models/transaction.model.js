const BaseModel = require('./base.model');
const { v4 } = require('uuid');
const Item = require('./item.model');
const Person = require('./person.model');
const Event = require('./event.model');

class Transaction extends BaseModel {
  static get tableName() {
    return 'events';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'eventId',
        'itemId',
        'buyerId',
        'amount',
        'isDonated',
        'isPayed',
        'isLastBuyer',
        'dateCreated'
      ],

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
        itemId: {
          type: 'string',
          minLength: 1,
          maxLength: 36
        },
        buyerId: {
          type: 'string',
          minLength: 1,
          maxLength: 36
        },
        amount: {
          type: 'float'
        },
        isDonated: {
          type: 'boolean',
          minLength: 1,
          maxLength: 45
        },
        isPayed: {
          type: 'boolean',
          minLength: 1,
          maxLength: 45
        },
        isLastBuyer: {
          type: 'boolean',
          minLength: 1,
          maxLength: 45
        },
        dateCreated: {
          type: 'date'
        },
        paymentMethod: {
          type: 'string',
          minLength: 1,
          maxLength: 11
        },
        paymentReference: {
          type: 'string',
          minLength: 1,
          maxLength: 100
        },
        paymentDate: {
          type: ['date', null]
        },
        dateUpdated: {
          type: ['date', null]
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
          from: 'transactions.itemId',
          to: 'items.id'
        }
      },
      persons: {
        relation: BaseModel.HasManyRelation,
        modelClass: Person,
        join: {
          from: 'transactions.buyerId',
          to: 'persons.id'
        }
      },
      events: {
        relation: BaseModel.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'transactions.eventId',
          to: 'events.id'
        }
      }
    };
  }

  async $beforeInsert(queryContext) {
    this.id = v4();
    await super.$afterInsert(queryContext);
  }
}

module.exports = Transaction;
