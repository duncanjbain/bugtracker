import React from 'react';
import { useTheme } from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import PulseLoader from 'react-spinners/PulseLoader';
import { WideSingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import {
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableLink,
} from '../ui/components/StyledTable';

const GET_ALL_PROJECTS = gql`
  query {
    getAllProjects {
      id
      projectKey
      projectName
      projectLead {
        id
        name
      }
    }
  }
`;

const Projects = () => {
  const theme = useTheme();
  const { data, loading } = useQuery(GET_ALL_PROJECTS);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <PulseLoader loading="true" color={theme.colors.primary} />
      </div>
    );
  }

  return (
    <WideSingleColumnFlex>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <div style={{ overflow: 'auto' }}>
        <StyledTable>
          <thead>
            <tr>
              <StyledTableHeader>Key</StyledTableHeader>
              <StyledTableHeader>Project Name</StyledTableHeader>
              <StyledTableHeader>Project Lead</StyledTableHeader>
            </tr>
          </thead>
          <tbody>
            {data.getAllProjects.map((project) => (
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
      </div>
    </WideSingleColumnFlex>
  );
};

export default Projects;
