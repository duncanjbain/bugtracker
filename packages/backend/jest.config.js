module.exports = {
  preset: '@shelf/jest-mongodb',
  setupFiles: ['<rootDir>/.env.test'],
  setupFilesAfterEnv: [
    '<rootDir>/testSetup.js',
  ],
};
