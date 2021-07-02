import React from 'react';
import {
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableLink,
  StyledTableCell,
} from '../../ui/components/StyledTable';
import SortIcon from './SortIcon';
import { SortButton } from '../../ui/components/SortButton';
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

  return (
    <StyledTable data-cy="projectTable">
      <thead>
        <tr>
          <StyledTableHeader>
            Key{' '}
            <SortButton type="button" onClick={() => requestSort('projectKey')}>
              <SortIcon sortOrder={getSortOrder('projectKey')} />
            </SortButton>
          </StyledTableHeader>
          <StyledTableHeader>
            Project Name{' '}
            <SortButton
              type="button"
              onClick={() => requestSort('projectName')}
            >
              <SortIcon sortOrder={getSortOrder('projectName')} />
            </SortButton>
          </StyledTableHeader>
          <StyledTableHeader>
            Project Lead{' '}
            <SortButton
              type="button"
              onClick={() => requestSort('projectLead')}
            >
              <SortIcon sortOrder={getSortOrder('projectLead')} />
            </SortButton>
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
