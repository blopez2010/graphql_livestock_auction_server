const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { GraphQLScalarType } = require('graphql');
const { verify } = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');

const mutations = require('./resolvers');
const queries = require('./queries');
const subscriptions = require('./subscriptions');
const { Item, Transaction } = require('./types');

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  Subscription: {
    ...subscriptions,
  },
  ...Item,
  ...Transaction,
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'A valid date value',
    serialize: value => value,
    parseValue: value => {
      return new Date(value).toISOString();
    },
    parseLiteral: literal => {
      return new Date(literal.value).toISOString();
    }
  })
};

const filePath = path.join(__dirname, './schema/schema.graphql');
const typeDefs = importSchema(filePath);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
});

const server = new ApolloServer({
  schema,
  cors: {
    origin: '*',
    credentials: true,
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context;
    }

    const key = req.headers['public-key'];
    const token = req.headers['auth-lsa'];

    try {
      if (token) {
        if (!verify(token, process.env.privateKey)) {
          console.log('Token is not valid according to private key', token);

          throw new Error('Unauthorized');
        }
      } else if (!key || key !== process.env.publicKey) {
        throw new Error('Public Key is not valid');
      }
    } catch (error) {
      console.log('Token is invalid', token, error);

      throw new Error('Unauthorized');
    }

    return token;
  },
});

server
  .listen()
  .then(({ url }) => `🚀 GraphQL server listening on ${url}`)
  .then(console.log)
  .catch(console.error);
