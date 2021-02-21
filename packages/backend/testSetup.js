const mongoose = require('mongoose');

const Project = require('./models/Project');
const User = require('./models/User');
const Bug = require('./models/Bug');

async function dropAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running')) return
      console.log(error.message)
    }
  }
}

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