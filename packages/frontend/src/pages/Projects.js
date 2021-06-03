import React from 'react';
import { useTheme } from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import PulseLoader from 'react-spinners/PulseLoader';
import { WideSingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import ProjectTableList from '../components/table/ProjectTableList';
import { StyledLink } from '../ui/typography';

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
  console.log(data);

  return (
    <WideSingleColumnFlex>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <div style={{ overflow: 'auto' }}>
        <div>
          {data.getAllProjects.length > 0 ? (
            <ProjectTableList projects={data.getAllProjects} />
          ) : (
            <p>
              You currently do not have any projects added! Try addding one{' '}
              <StyledLink to="/createproject">here</StyledLink>!
            </p>
          )}
        </div>
      </div>
    </WideSingleColumnFlex>
  );
};

export default Projects;
