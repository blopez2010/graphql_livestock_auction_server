const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { GraphQLScalarType } = require('graphql');
const { verify } = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');

const mutations = require('./resolvers');
const queries = require('./queries');
const { Item, Transaction } = require('./types');

const resolvers = {
  Query: {
    ...queries
  },
  Mutation: {
    ...mutations
  },
  ...Item,
  ...Transaction,
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'A valid date value',
    serialize: value => value,
    parseValue: value => new Date(value).toUTCString(),
    parseLiteral: literal => new Date(literal.value).toUTCString()
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
    const key = req.headers['public-key'];
    const token = req.headers.authorization;

    try {
      if (token) {
        if (!verify(token, process.env.privateKey)) {
          throw new Error('Unauthorized');
        }
      } else if (!key || key !== process.env.publicKey) {
        throw new Error('Public Key is not valid');
      }
    } catch (error) {
      throw new Error('Unauthorized');
    }
  }
});

server
  .listen()
  .then(({ url }) => `🚀 GraphQL server listening on ${url}`)
  .then(console.log)
  .catch(console.error);
