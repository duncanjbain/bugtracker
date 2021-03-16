import React from 'react';
import {
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableLink,
  StyledTableCell,
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
          <StyledTableCell>{project.projectKey}</StyledTableCell>
          <StyledTableCell>
            <StyledTableLink to={`/project/${project.projectKey}`}>
              {project.projectName}
            </StyledTableLink>
          </StyledTableCell>
          <StyledTableCell>
            <StyledTableLink to={`/user/${project.projectLead.id}`}>
              {project.projectLead.name}
            </StyledTableLink>
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </tbody>
  </StyledTable>
);

export default DashboardProjectsCardList;
