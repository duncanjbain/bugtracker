const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');
const User = require('../../models/User');

module.exports = {
  Query: {
    getAllBugs: async (root, args, { Bug, currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      return Bug.find({});
    },
    getBug: async (root, { bugId }, { Bug }) =>
      Bug.findOne({ _id: bugId }).populate('author').populate('project'),
    getBugByKey: async (root, { bugKey }, { Bug }) =>
      Bug.findOne({ key: bugKey }).populate('author').populate('project').populate('assignee'),
    getUsersBugs: async (root, { userId }, { Bug, currentUser }) => {
      if (!currentUser || !currentUser.id === userId) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      const foundUser = await User.findById(userId)
        .populate({
          path: 'createdBugs',
          populate: { path: 'project', model: 'Project' },
        })
        .populate({
          path: 'assignedBugs',
          populate: { path: 'project', model: 'Project' },
        });
      return {
        createdBugs: foundUser.createdBugs,
        assignedBugs: foundUser.assignedBugs,
      };
    },
  },
  Mutation: {
    createBug: async (
      root,
      { key, summary, description, priority, author, project, assignee, type },
      { Bug, User, Project, currentUser }
    ) => {
      if (!currentUser) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
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
        author,
        project,
        assignee,
      }).save();
      await Project.findOneAndUpdate(
        { _id: project },
        { $addToSet: { projectBugs: newBug.id } }
      );
      await User.findOneAndUpdate(
        { _id: assignee },
        { $addToSet: { assignedBugs: newBug.id } }
      );
      await User.findOneAndUpdate(
        { _id: author },
        { $addToSet: { createdBugs: newBug.id } }
      );
      return newBug;
    },
    updateExistingBug: async (root, { bugId, ...args }, { Bug }) =>
      Bug.findByIdAndUpdate(
        bugId,
        {
          $set: args,
        },
        { new: true }
      ),
    deleteExistingBug: async (root, { bugId }, { Bug, currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError(
          'You do not have permission for this request'
        );
      }
      Bug.findByIdAndRemove(bugId)
    }
  },
};
