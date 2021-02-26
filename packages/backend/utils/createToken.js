const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const createToken = (user) => {
  const { id, email } = user;
  return jwt.sign(
    {
      id,
      email,
    },
    JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
};

module.exports = { createToken };
