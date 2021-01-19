const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const createToken = (user, secret) => {
  const { id, email, firstName, lastName, username } = user;
  return jwt.sign(
    {
      id,
      email,
      username,
      firstName,
      lastName,
    },
    secret,
    {
      expiresIn: '1d',
    }
  );
};

const resolvers = {
  Mutation: {
    signupUser: async (
      root,
      { firstName, lastName, email, password, username },
      { User }
    ) => {
      const foundUser = await User.findOne({ username });
      if (foundUser) {
        throw new UserInputError('User with this username already exists');
      }

      const newUser = await new User({
        firstName,
        lastName,
        username,
        email,
        password,
      }).save();
      return { user: newUser, token: createToken(newUser, JWT_SECRET) };
    },
    signinUser: async (root, { username, password }, { User }) => {
      const foundUser = await User.findOne({ username });
      const isValidPassowrd = bcrypt.compare(password, foundUser.password);

      if (!foundUser || !isValidPassowrd) {
        throw new AuthenticationError('Invalid email or password');
      }

      return { user: foundUser, token: createToken(foundUser, JWT_SECRET) };
    },
    createBug: async (
      root,
      { key, summary, description, priority, author, project, labels },
      { Bug, User }
    ) => {
      const foundKey = await Bug.findOne({ key });
      if (foundKey) {
        throw new UserInputError('Bug with this key already exists');
      }
      const bugAuthor = await User.findOne({ username: author });
      if (!bugAuthor) {
        throw new UserInputError('An author is required when creating a bug');
      }

      const newBug = await new Bug({
        key,
        summary,
        description,
        priority,
        author: bugAuthor.id,
        project,
        labels,
      }).save();
      await newBug.populate('author').execPopulate();
      return { Bug: newBug, BugAuthor: bugAuthor };
    },
  },
};

module.exports = resolvers;
