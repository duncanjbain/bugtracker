const { UserInputError, AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

const createToken = (user, secret) => {
  const { id, email, firstName, lastName } = user
  return jwt.sign(
    {
      id,
      email,
      firstName,
      lastName,
    },
    secret,
    {
      expiresIn: '1d',
    }
  )
}

const resolvers = {
  Mutation: {
    signupUser: async (
      root,
      { firstName, lastName, email, password },
      { User }
    ) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new UserInputError('User with this email already exists')
      }

      const newUser = await new User({
        firstName,
        lastName,
        email,
        password,
      }).save()
      return { user: newUser, token: createToken(newUser, JWT_SECRET) }
    },
    signinUser: async (root, { email, password }, { User }) => {
      const user = await User.findOne({ email })
      const isValidPassowrd = bcrypt.compare(password, user.password)

      if (!user || !isValidPassowrd) {
        throw new AuthenticationError('Invalid email or password')
      }

      return { user: user, token: createToken(user, JWT_SECRET) }
    },
  },
}

module.exports = resolvers
