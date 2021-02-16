const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const createToken = (user) => {
  const { id, email, username } = user;
  return jwt.sign(
    {
      id,
      email,
      username,
    },
    JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
};

module.exports = { createToken };
