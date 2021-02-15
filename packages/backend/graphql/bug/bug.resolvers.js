const { AuthenticationError } = require('apollo-server-express');

module.exports = {
  Query: {
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
  },
  Mutation: {
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
