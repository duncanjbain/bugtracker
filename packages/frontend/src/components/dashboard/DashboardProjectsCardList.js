import React from 'react';
import {
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableLink,
  StyledTableCell,
} from '../../ui/components/StyledTable';
import SortButton from './SortButton';

import useSortTable from '../../hooks/useSortTable';

const DashboardProjectsCardList = ({ projects }) => {
  const { items, requestSort, sortConfig } = useSortTable(projects);

  const getSortOrder = (name) => {
    if (!sortConfig) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          <StyledTableHeader>
            Key
            <button type="button" onClick={() => requestSort('projectKey')}>
              Sort
            </button>
            <SortButton sortOrder={getSortOrder('projectKey')} />
          </StyledTableHeader>
          <StyledTableHeader>Project Name</StyledTableHeader>
          <StyledTableHeader>Project Lead</StyledTableHeader>
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

export default DashboardProjectsCardList;
