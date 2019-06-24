const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { GraphQLScalarType } = require('graphql');
const Knex = require('knex');
const config = require('../config');
const { Model } = require('objection');
require('dotenv').config();
const path = require('path');

const mutations = require('./resolvers');
const queries = require('./queries');

let knex;

switch (process.env.NODE_ENV) {
  case 'production':
    knex = Knex(config.knex.production);
    break;
  default:
    knex = Knex(config.knex.local);
    break;
}

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);

const resolvers = {
  Query: {
    ...queries
  },
  Mutation: {
    ...mutations
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'A valid date value',
    serialize: value => value.substring(0, 10),
    parseValue: value => new Date(value).toISOString(),
    parseLiteral: literal => new Date(literal.value).toISOString()
  })
};

const filePath = path.join(__dirname, './schema/schema.graphql');
const typeDefs = importSchema(filePath);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false }
});

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const key = req.headers.authorization;

    if (!key && key !== process.env.publicKey) {
      throw new Error('Public Key is not valid');
    }
  }
});

server
  .listen()
  .then(({ url }) => `🚀 GraphQL server listening on ${url}`)
  .then(console.log)
  .catch(console.error);
