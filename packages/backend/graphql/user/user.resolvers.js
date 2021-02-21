const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');

const bcrypt = require('bcrypt');

const { createToken } = require('../../utils/createToken');

module.exports = {
  Query: {
    getWhoAmI: async (root, args, { User, currentUser }) => {
      if (!currentUser) {
        return null;
      }
      return User.findById(currentUser.id);
    },
    getUser: async (root, { userId }, { User, currentUser }) => {
      if (!currentUser || !currentUser.siteRole.includes('ADMIN')) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      return User.findById(userId);
    },
    getAllUsers: async (root, args, { User, currentUser }) => {
      if (!currentUser || !currentUser.siteRole.includes('ADMIN')) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      return User.find({});
    },
  },
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
      return { user: newUser, token: createToken(newUser) };
    },
    loginUser: async (root, { username, password }, { User }) => {
      const foundUser = await User.findOne({ username }).select('+password');
      const isValidPassword = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!foundUser || !isValidPassword) {
        throw new AuthenticationError('Invalid email or password');
      }

      return { user: foundUser, token: createToken(foundUser) };
    },
    updateUser: async (root, { id, ...args }, { User, currentUser }) => {
      if (!id === currentUser.id || currentUser.siteRole.includes('ADMIN')) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      return User.findByIdAndUpdate(
        id,
        {
          $set: args,
        },
        { new: true }
      );
    },
  },
};
