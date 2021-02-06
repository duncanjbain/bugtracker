import React from 'react';

const DashboardProjectsCardList = ({projects}) => (
  <ul>
    {projects.map((project) => (
      <li key={project._id}>
        <h5>
          {project.projectName} ({project.projectKey})
        </h5>{' '}
      </li>
    ))}
  </ul>
);

export default DashboardProjectsCardList;
