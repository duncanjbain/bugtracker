import React from 'react';
import { useTheme } from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import PulseLoader from 'react-spinners/PulseLoader';
import SingleColumnFlex from '../ui/components/PageContainers';
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
      _id
      projectKey
      projectName
      projectLead {
        username
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
    <SingleColumnFlex
      style={{
        width: 'auto',
        'margin-left': '1.5rem',
        'margin-right': '1.5rem',
      }}
    >
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <StyledTable>
        <thead>
          <StyledTableHeader>Key</StyledTableHeader>
          <StyledTableHeader>Project Name</StyledTableHeader>
          <StyledTableHeader>Project Lead</StyledTableHeader>
        </thead>
        <tbody>
          {data.getAllProjects.map((project) => (
            <StyledTableRow>
              <td>{project.projectKey}</td>
              <td>
                <StyledTableLink to={`/project/${project.projectKey}`}>
                  {project.projectName}
                </StyledTableLink>
              </td>
              <td>
                <StyledTableLink to={`/user/${project.projectLead._id}`}>
                  {project.projectLead.username}
                </StyledTableLink>
              </td>
            </StyledTableRow>
          ))}
        </tbody>
      </StyledTable>
    </SingleColumnFlex>
  );
};

export default Projects;
