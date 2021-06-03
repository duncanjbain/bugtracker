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
      if (!currentUser) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      return User.findById(userId);
    },
    getAllUsers: async (root, args, { User, currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      return User.find({});
    },
  },
  Mutation: {
    signupUser: async (root, { name, email, password }, { User }) => {
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        throw new UserInputError('User with this username already exists');
      }

      const newUser = await new User({
        name,
        email,
        password,
      }).save();
      return { user: newUser, token: createToken(newUser) };
    },
    loginUser: async (root, { email, password }, { User }) => {
      const foundUser = await User.findOne({ email }).select('+password');
      if (!foundUser) {
        throw new AuthenticationError('Invalid email or password');
      }
      const isValidPassword = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!isValidPassword) {
        throw new AuthenticationError('Invalid email or password');
      }

      return { user: foundUser, token: createToken(foundUser) };
    },
    updateUser: async (root, { id, ...args }, { User, currentUser }) => {
      if (id != currentUser.id) {
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
