import React from 'react';
import {
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableLink,
} from '../../ui/components/StyledTable';

const DashboardBugsList = ({ title, bugs }) => (
  <div>
    <h4>{title}</h4>
    <StyledTable>
      <thead>
        <tr>
          <StyledTableHeader>Key</StyledTableHeader>
          <StyledTableHeader>Project</StyledTableHeader>
          <StyledTableHeader>Summary</StyledTableHeader>
          <StyledTableHeader>Priority</StyledTableHeader>
        </tr>
      </thead>
      <tbody>
        {bugs.map((bug) => (
          <StyledTableRow key={bug.key}>
            <td>
              <StyledTableLink to={`/bug/${bug.key}`}>
                {bug.key}
              </StyledTableLink>
            </td>
            <td>
              <StyledTableLink to={`/project/${bug.project.projectKey}`}>
                {bug.project.projectName}
              </StyledTableLink>
            </td>
            <td>{bug.summary}</td>
            <td>{bug.priority}</td>
          </StyledTableRow>
        ))}
      </tbody>
    </StyledTable>
  </div>
);

export default DashboardBugsList;
