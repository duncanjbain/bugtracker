const { AuthenticationError } = require('apollo-server-express');


module.exports = {
  Query: {
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
    getProject: async (root, { searchKey }, { Project }) =>
      Project.findOne({ projectKey: searchKey })
        .populate('projectLead')
        .populate('projectMembers')
        .populate({
          path: 'projectBugs',
          populate: { path: 'assignee', model: 'User' },
        }).populate({
          path: 'projectBugs',
          populate: { path: 'author', model: 'User' },
        }),
    getUserProjects: async (root, { userID }, { Project, User }) => {
      const foundUser = await User.findById(userID);
      const foundProjects = await Project.find({
        $or: [
          { projectLead: foundUser.id },
          { projectMembers: foundUser.id },
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
    createProject: async (
      root,
      { projectKey, projectName },
      { Project, currentUser, User }
    ) => {
      const projectOwner = await User.findById(currentUser.id);
      const foundProject = await Project.findOne({ projectKey });
      if (foundProject) {
        throw new AuthenticationError('A project with this key already exists');
      }

      const newProject = await new Project({
        projectKey,
        projectName,
        projectLead: currentUser.id,
      });
      newProject.projectMembers = [
        ...newProject.projectMembers,
        currentUser.id,
      ];
      await newProject.save();
      projectOwner.memberOfProjects = [
        ...projectOwner.memberOfProjects,
        newProject.id,
      ];
      await projectOwner.save();
      await newProject.populate('projectLead').execPopulate();
      return newProject;
    },
  },
};
