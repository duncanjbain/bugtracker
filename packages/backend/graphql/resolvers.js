const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const createToken = (user, secret) => {
  const { id, email, username } = user;
  return jwt.sign(
    {
      id,
      email,
      username,
    },
    secret,
    {
      expiresIn: '1d',
    }
  );
};

const resolvers = {
  Query: {
    getWhoAmI: async (root, args, { User, currentUser }) => {
      if (!currentUser) {
        return null;
      }
      return User.findById(currentUser.id);
    },
    getUser: async (root, { userId }, { User, currentUser }) => {
      if (!currentUser || !currentUser.siteRole.includes('ADMIN')) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      return User.findById(userId);
    },
    getAllUsers: async (root, args, { User, currentUser }) => {
      if (!currentUser || !currentUser.siteRole.includes('ADMIN')) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      return User.find({});
    },
    getAllBugs: async (root, args, { Bug, currentUser }) => {
      if (!currentUser || !currentUser.siteRole.includes('ADMIN')) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      return Bug.find({});
    },
    getBug: async (root, { bugId }, { Bug }) =>
      Bug.findOne({ _id: bugId }).populate('author').populate('project'),
    getAllProjects: async (root, args, { Project, currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      return Project.find({})
        .populate('projectLead')
        .populate('projectMembers')
        .populate('projectBugs');
    },
    getProject: async (root, { projectID }, { Project }) =>
      Project.findOne({ _id: projectID })
        .populate('projectLead')
        .populate('projectMembers')
        .populate('projectBugs'),
    getUserProjects: async (root, { userID }, { Project, User }) => {
      const foundUser = await User.findById(userID);
      const foundProjects = await Project.find({
        $or: [
          { projectLead: foundUser._id },
          { projectMembers: foundUser._id },
        ],
      })
        .populate('projectLead')
        .populate('projectMembers')
        .populate('projectBugs');
      return foundProjects;
    },
    getProjectMembers: async (root, { projectID }, { Project }) => {
      const foundProject = await Project.findById(projectID)
        .populate('projectMembers')
        .populate('projectLead');
      return foundProject.projectMembers;
    },
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
    loginUser: async (root, { username, password }, { User }) => {
      const foundUser = await User.findOne({ username }).select('+password');
      const isValidPassword = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!foundUser || !isValidPassword) {
        throw new AuthenticationError('Invalid email or password');
      }

      return { user: foundUser, token: createToken(foundUser, JWT_SECRET) };
    },
    updateUser: async (root, { _id, ...args }, { User, currentUser }) => {
      if (!_id === currentUser.id || !currentUser.siteRole.includes('ADMIN')) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      return User.findByIdAndUpdate(
        _id,
        {
          $set: args,
        },
        { new: true }
      );
    },
    createProject: async (
      root,
      { projectKey, projectName },
      { Project, currentUser, User }
    ) => {
      const projectOwner = await User.findById(currentUser._id);
      const foundProject = await Project.findOne({ projectKey });
      if (foundProject) {
        throw new AuthenticationError('A project with this key already exists');
      }

      const newProject = await new Project({
        projectKey,
        projectName,
        projectLead: currentUser._id,
      });
      newProject.projectMembers = [
        ...newProject.projectMembers,
        currentUser._id,
      ];
      await newProject.save();
      projectOwner.memberOfProjects = [
        ...projectOwner.memberOfProjects,
        newProject._id,
      ];
      await projectOwner.save();
      await newProject.populate('projectLead').execPopulate();
      return newProject;
    },
    createBug: async (
      root,
      { key, summary, description, priority, author, project, assignee, type },
      { Bug, User, Project }
    ) => {
      const foundBugKey = await Bug.exists({ key });
      if (foundBugKey) {
        throw new UserInputError('Bug with this key already exists');
      }
      const bugAuthor = await User.exists({ _id: author });
      if (!bugAuthor) {
        throw new UserInputError('An author is required when creating a bug');
      }

      const foundAssignee = await User.exists({ _id: assignee });
      if (!foundAssignee) {
        throw new UserInputError('A user must be assigned when creating a bug');
      }

      const bugProject = await Project.exists({ _id: project });
      if (!bugProject) {
        throw new UserInputError('A project is required when creating a bug');
      }
      const newBug = await new Bug({
        key,
        summary,
        description,
        priority,
        type,
        author: bugAuthor._id,
        project: bugProject._id,
        assignee: foundAssignee._id,
      }).save();
      await Project.findOneAndUpdate(
        { _id: project },
        { $addToSet: { projectBugs: newBug._id } }
      );
      await User.findOneAndUpdate(
        { _id: assignee },
        { $addToSet: { assignedBugs: newBug._id } }
      );
      await User.findOneAndUpdate(
        { _id: author },
        { $addToSet: { createdBugs: newBug._id } }
      );
      return newBug;
    },
    updateExistingBug: async (root, { _id, ...args }, { Bug }) =>
      Bug.findByIdAndUpdate(
        _id,
        {
          $set: args,
        },
        { new: true }
      ),
    deleteExistingBug: async (root, { _id }, { Bug }) =>
      Bug.findByIdAndRemove(_id),
  },
};

module.exports = resolvers;
