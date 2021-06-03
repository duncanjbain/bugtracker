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

const ProjectTableList = ({ projects }) => {
  const { items, requestSort, sortConfig } = useSortTable(projects);

  const getSortOrder = (name) => {
    if (!sortConfig) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  console.log(items);

  return (
    <StyledTable>
      <thead>
        <tr>
          <StyledTableHeader>
            Key{' '}
            <button type="button" onClick={() => requestSort('projectKey')}>
              <SortIcon sortOrder={getSortOrder('projectKey')} />
            </button>
          </StyledTableHeader>
          <StyledTableHeader>
            Project Name{' '}
            <button type="button" onClick={() => requestSort('projectName')}>
              <SortIcon sortOrder={getSortOrder('projectName')} />
            </button>
          </StyledTableHeader>
          <StyledTableHeader>
            Project Lead{' '}
            <button type="button" onClick={() => requestSort('projectLead')}>
              <SortIcon sortOrder={getSortOrder('projectLead')} />
            </button>
          </StyledTableHeader>
        </tr>
      </thead>
      <tbody>
        {items.map((project) => (
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
};

export default ProjectTableList;
