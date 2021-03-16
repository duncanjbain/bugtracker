import React from 'react';
import {
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableLink,
} from '../../ui/components/StyledTable';

const DashboardProjectsCardList = ({ projects }) => (
  <StyledTable>
    <thead>
      <tr>
        <StyledTableHeader>Key</StyledTableHeader>
        <StyledTableHeader>Project Name</StyledTableHeader>
        <StyledTableHeader>Project Lead</StyledTableHeader>
      </tr>
    </thead>
    <tbody>
      {projects.map((project) => (
        <StyledTableRow key={project.projectKey}>
          <td>{project.projectKey}</td>
          <td>
            <StyledTableLink to={`/project/${project.projectKey}`}>
              {project.projectName}
            </StyledTableLink>
          </td>
          <td>
            <StyledTableLink to={`/user/${project.projectLead.id}`}>
              {project.projectLead.name}
            </StyledTableLink>
          </td>
        </StyledTableRow>
      ))}
    </tbody>
  </StyledTable>
);

export default DashboardProjectsCardList;
