import React from 'react';
import {
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableLink,
  StyledTableCell,
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
          <StyledTableHeader>Type</StyledTableHeader>
          <StyledTableHeader>Due On</StyledTableHeader>
          <StyledTableHeader>Priority</StyledTableHeader>
        </tr>
      </thead>
      <tbody>
        {bugs.map((bug) => {
          const dueOn = new Date(parseInt(bug.dateDue, 10));
          return (
            <StyledTableRow key={bug.key}>
              <StyledTableCell>
                <StyledTableLink to={`/bug/${bug.key}`}>
                  {bug.key}
                </StyledTableLink>
              </StyledTableCell>
              <StyledTableCell>
                <StyledTableLink to={`/project/${bug.project.projectKey}`}>
                  {bug.project.projectName}
                </StyledTableLink>
              </StyledTableCell>
              <StyledTableCell>
                <StyledTableLink to={`/bug/${bug.key}`}>
                  {bug.summary}
                </StyledTableLink>
              </StyledTableCell>
              <StyledTableCell style={{ textTransform: 'capitalize' }}>
                {bug.type}
              </StyledTableCell>
              <StyledTableCell>
                {dueOn.toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </StyledTableCell>
              <StyledTableCell style={{ textTransform: 'capitalize' }}>
                {bug.priority}
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </tbody>
    </StyledTable>
  </div>
);

export default DashboardBugsList;
