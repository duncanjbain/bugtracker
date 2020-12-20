require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const { ApolloServer, AuthenticationError, makeExecutableSchema } = require('apollo-server-express')
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers')
const User = require('./models/User')


const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

const path = '/graphql';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

 const getCurrentUser = async (req) => {
    const auth = req.headers.authorization ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      try {
        const decodedToken = await jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return currentUser;
      } catch(error) {
        throw new AuthenticationError("Unable to authenticate")
      }
    }
  }

const apolloServer = new ApolloServer({
  schema,
  context: async ({req }) => {
    //pass User MongoDB model and currentUser into Apollo context
    const currentUser = await getCurrentUser(req)
    console.log('currentUser', currentUser)
    console.log('user', User)
    console.log('resolvers', resolvers)
    return {
      currentUser,
      User
    }
  }
});



apolloServer.applyMiddleware({ app, path})

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World! Github workflow test 2')
})

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${path}`)
})
