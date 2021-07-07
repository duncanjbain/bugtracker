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
            <SortButton
              aria-label="Sort Button"
              type="button"
              onClick={() => requestSort('projectKey')}
            >
              <SortIcon sortOrder={getSortOrder('projectKey')} />
            </SortButton>
          </StyledTableHeader>
          <StyledTableHeader>
            Project Name{' '}
            <SortButton
              aria-label="Sort Button"
              type="button"
              onClick={() => requestSort('projectName')}
            >
              <SortIcon
                aria-label="Sort Button"
                sortOrder={getSortOrder('projectName')}
              />
            </SortButton>
          </StyledTableHeader>
          <StyledTableHeader>
            Project Lead{' '}
            <SortButton
              aria-label="Sort Button"
              type="button"
              onClick={() => requestSort('projectLead')}
            >
              <SortIcon
                aria-label="Sort Button"
                sortOrder={getSortOrder('projectLead')}
              />
            </SortButton>
          </StyledTableHeader>
        </tr>
      </thead>
      <tbody>
        {items.map((project) => (
          <StyledTableRow key={project.projectKey}>
            <StyledTableCell>{project.projectKey}</StyledTableCell>
            <StyledTableCell>
              <StyledTableLink
                data-cy={`projectTable-projectLink-${project.projectKey}`}
                to={`/project/${project.projectKey}`}
              >
                {project.projectName}
              </StyledTableLink>
            </StyledTableCell>
            <StyledTableCell>
              <StyledTableLink
                data-cy={`projectTable-projectLeadLink-${project.projectLead.id}`}
                to={`/user/${project.projectLead.id}`}
              >
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
