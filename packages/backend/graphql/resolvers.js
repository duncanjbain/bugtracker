const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const createToken = (user, secret) => {
  const { id, email, firstName, lastName, username } = user;
  return jwt.sign(
    {
      id,
      email,
      username,
      firstName,
      lastName,
    },
    secret,
    {
      expiresIn: '1d',
    }
  );
};

const resolvers = {
  Query: {
    getAllBugs: async (root, args, { Bug }) =>
      Bug.find({}).populate('author').populate('project').populate('labels'),
    getAllProjects: async (root, args, { Project }) =>
      Project.find({}).populate('projectLead'),
  },
  Mutation: {
    signupUser: async (
      root,
      { firstName, lastName, email, password, username },
      { User }
    ) => {
      const foundUser = await User.findOne({ username });
      if (foundUser) {
        throw new UserInputError('User with this username already exists');
      }

      const newUser = await new User({
        firstName,
        lastName,
        username,
        email,
        password,
      }).save();
      return { user: newUser, token: createToken(newUser, JWT_SECRET) };
    },
    signinUser: async (root, { username, password }, { User }) => {
      const foundUser = await User.findOne({ username }).select('+password');
      const isValidPassowrd = bcrypt.compare(password, foundUser.password);

      if (!foundUser || !isValidPassowrd) {
        throw new AuthenticationError('Invalid email or password');
      }

      return { user: foundUser, token: createToken(foundUser, JWT_SECRET) };
    },
    createProject: async (
      root,
      { projectKey, projectName, projectLead },
      { Project, User }
    ) => {
      const foundProject = await Project.findOne({ projectKey });
      const newProjectLead = await User.findOne({ username: projectLead });
      if (foundProject) {
        throw new AuthenticationError('A project with this key already exists');
      }

      const newProject = await new Project({
        projectKey,
        projectName,
        projectLead: newProjectLead.id,
      }).save();
      await newProject.populate('projectLead').execPopulate();
      return newProject;
    },
    createBug: async (
      root,
      { key, summary, description, priority, author, project, labels },
      { Bug, User, Project }
    ) => {
      const foundBugKey = await Bug.findOne({ key });
      if (foundBugKey) {
        throw new UserInputError('Bug with this key already exists');
      }
      const bugAuthor = await User.findOne({ username: author });
      if (!bugAuthor) {
        throw new UserInputError('An author is required when creating a bug');
      }

      const bugProject = await Project.findOne({ projectKey: project });
      if (!bugProject) {
        throw new UserInputError('A project is required when creating a bug');
      }
      const newBug = await new Bug({
        key,
        summary,
        description,
        priority,
        author: bugAuthor.id,
        project: bugProject.id,
        labels,
      }).save();
      bugProject.projectBugs.push(newBug.id);
      await bugProject.save();
      return { Bug: newBug, BugAuthor: bugAuthor };
    },
    createBugLabel: async (
      root,
      { labelName, labelDescription, bugsWithLabel },
      { Bug, BugLabel }
    ) => {
      const foundLabel = await BugLabel.findOne({ labelName });
      if (foundLabel) {
        throw new UserInputError('This bug label already exists');
      }
      const foundBug = await Bug.findOne({ _id: bugsWithLabel });
      const newBugLabel = await new BugLabel({
        labelName,
        labelDescription,
        bugsWithLabel: [foundBug.id],
      }).save();
      await newBugLabel.populate('bugsWithLabel').execPopulate();
      return newBugLabel;
    },
  },
};

module.exports = resolvers;
