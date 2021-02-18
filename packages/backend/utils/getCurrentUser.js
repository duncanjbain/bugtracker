const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');

const { JWT_SECRET } = process.env;

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

module.exports = { getCurrentUser };
