import React from 'react';
import {
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableLink,
  StyledTableCell,
} from '../../ui/components/StyledTable';
import SortIcon from './SortIcon';

import useSortTable from '../../hooks/useSortTable';

const DashboardBugsList = ({ title, bugs }) => {
  const { items, requestSort, sortConfig } = useSortTable(bugs);

  const getSortOrder = (name) => {
    if (!sortConfig) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <div>
      <h4>{title}</h4>
      <StyledTable>
        <thead>
          <tr>
            <StyledTableHeader>
              Key{' '}
              <button type="button" onClick={() => requestSort('key')}>
                <SortIcon sortOrder={getSortOrder('key')} />
              </button>
            </StyledTableHeader>
            <StyledTableHeader>
              Project{' '}
              <button type="button" onClick={() => requestSort('project')}>
                <SortIcon sortOrder={getSortOrder('project')} />
              </button>
            </StyledTableHeader>
            <StyledTableHeader>
              Summary{' '}
              <button type="button" onClick={() => requestSort('summary')}>
                <SortIcon sortOrder={getSortOrder('summary')} />
              </button>
            </StyledTableHeader>
            <StyledTableHeader>
              Type{' '}
              <button type="button" onClick={() => requestSort('type')}>
                <SortIcon sortOrder={getSortOrder('type')} />
              </button>
            </StyledTableHeader>
            <StyledTableHeader>
              Due On{' '}
              <button type="button" onClick={() => requestSort('dateDue')}>
                <SortIcon sortOrder={getSortOrder('dateDue')} />
              </button>
            </StyledTableHeader>
            <StyledTableHeader>
              Priority{' '}
              <button type="button" onClick={() => requestSort('priority')}>
                <SortIcon sortOrder={getSortOrder('priority')} />
              </button>
            </StyledTableHeader>
          </tr>
        </thead>
        <tbody>
          {items.map((bug) => {
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
};

export default DashboardBugsList;
