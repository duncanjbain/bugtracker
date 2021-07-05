const User = require('../models/User');
const Bug = require('../models/Bug');
const Project = require('../models/Project');

module.exports = seedDb = async () => {
    await new User({
      name: 'Test User',
      email: 'test@test.com',
      password: 'testing',
    }).save();
    await new User({
      name: 'Second User',
      email: 'secondtest@test.com',
      password: 'testing',
    }).save();
    await new User({
      name: 'Third User',
      email: 'third@test.com',
      password: 'testing',
    }).save();

    const ProjectUser = await new User({
        name: 'Project User',
        email: 'project@test.com',
        password: 'testing'
    }).save();

    const firstNewProject = await new Project({
        projectKey: 'KEY01',
        projectName: 'Project One',
        projectLead: ProjectUser.id,
        projectMembers:[ProjectUser.id]
      }).save();

      const firstBug = await new Bug({
        key: 'BUG01',
        summary: 'A',
        description: 'First bug description',
        priority: 'medium',
        type: 'defect',
        author: ProjectUser.id,
        project: firstNewProject.id,
        assignee: ProjectUser.id,
        dateDue: new Date(Date.now()),
      }).save();

      const secondBug = await new Bug({
        key: 'BUG02',
        summary: 'C',
        description: 'Second bug description',
        priority: 'medium',
        type: 'defect',
        author: ProjectUser.id,
        project: firstNewProject.id,
        assignee: ProjectUser.id,
        dateDue: new Date(Date.now()),
      }).save();

      const thirdBug = await new Bug({
        key: 'BUG03',
        summary: 'B',
        description: 'Second bug description',
        priority: 'medium',
        type: 'defect',
        author: ProjectUser.id,
        project: firstNewProject.id,
        assignee: ProjectUser.id,
        dateDue: new Date(Date.now()),
      }).save();

      await User.findOneAndUpdate(
        { _id: ProjectUser },
        { $addToSet: { assignedBugs: [firstBug.id, secondBug.id, thirdBug.id] } }
      );
      await User.findOneAndUpdate(
        { _id: ProjectUser },
        { $addToSet: { createdBugs: [firstBug.id, secondBug.id, thirdBug.id] } }
      );

  };