const mongoose = require('mongoose');

const Project = require('./models/Project');
const User = require('./models/User');
const Bug = require('./models/Bug');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true)
    mongoose.set('useNewUrlParser', true);
  });


afterEach(async () => {
  await User.remove({})
  await Project.remove({})
  await Bug.remove({})
})

beforeEach(async () => {
  await User.remove({})
  await Project.remove({})
  await Bug.remove({})
})

  afterAll(async () => {
    await mongoose.connection.close();
  });