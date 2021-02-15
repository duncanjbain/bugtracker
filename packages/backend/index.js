require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Bug = require('./models/Bug');
const Project = require('./models/Project');

const { MONGODB_URI } = process.env;
const typeDefs = require('./graphql/typedefs.js');
const resolvers = require('./graphql/rootResolvers');

const app = express();
const path = '/graphql';
const { JWT_SECRET } = process.env;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });
mongoose.set('useFindAndModify', false);

const getCurrentUser = async (req) => {
  const auth = req.headers.authorization ? req.headers.authorization : null;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = await jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return currentUser;
    } catch (error) {
      throw new AuthenticationError('Unable to authenticate');
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  // for development use
  introspection: true,
  playground: true,
  //
  context: async ({ req }) => {
    // pass User MongoDB model and currentUser into Apollo context
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${path}`);
});
