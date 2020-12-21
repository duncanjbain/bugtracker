const { UserInputError } = require('apollo-server-express')

const resolvers = {
  Mutation: {
      signupUser: async (root, {firstName, lastName, email, password}, { User }) => {
        console.log('signup')
        const user = await User.findOne({email})
        console.log('run signup')
        if(user) {
          throw new UserInputError('User with this email already exists')
        }

        const newUser = await new User({
          firstName,
          lastName,
          email,
          password
        }).save();
        return newUser;
      }
    }
}

module.exports = resolvers
