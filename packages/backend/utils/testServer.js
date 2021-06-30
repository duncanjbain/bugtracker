require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { ApolloServer } = require('apollo-server-express');
const User = require('../models/User');
const Bug = require('../models/Bug');
const Project = require('../models/Project');

const { getCurrentUser } = require('./getCurrentUser');

const typeDefs = require('../graphql/typedefs.js');
const resolvers = require('../graphql/rootResolvers');

const app = express();
const path = '/graphql';

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;
mongoServer.getUri().then((mongoUri) => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  // for development use
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    // pass User MongoDB models and currentUser into Apollo context
    const currentUser = await getCurrentUser(req);
    return {
      currentUser,
      User,
      Bug,
      Project,
    };
  },
});

apolloServer.applyMiddleware({
  app,
  path,
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${path}`);
});

const seedDb = async () => {
  const newUser = await new User({
    name: 'Test User',
    email: 'test@test.com',
    password: 'testing',
  }).save();
  console.log(newUser);
};

seedDb();
