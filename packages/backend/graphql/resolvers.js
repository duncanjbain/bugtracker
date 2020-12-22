const {
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (user, secret) => {
  const { email, firstName, lastName } = user;
  return jwt.sign({ email, firstName, lastName }, secret, { expiresIn: "1d" });
};

const resolvers = {
  Mutation: {
    signupUser: async (
      root,
      { firstName, lastName, email, password },
      { User }
    ) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("User with this email already exists");
      }

      const newUser = await new User({
        firstName,
        lastName,
        email,
        password,
      }).save();
      return newUser;
    },
    signinUser: async (root, { email, password }, { User }) => {
      const user = await User.findOne({ email });
      const isValidPassowrd = bcrypt.compare(password, user.password);

      if (!user || !isValidPassowrd) {
        throw new AuthenticationError("Invalid email or password");
      }

      return {token: createToken(user, JWT_SECRET)}
    },
  },
};

module.exports = resolvers;
