import React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { SingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import { StyledLink } from '../ui/typography';
import LoadingSpinner from '../ui/components/LoadingSpinner';

const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      name
      joinDate
      memberOfProjects {
        projectName
        projectKey
      }
      createdBugs {
        summary
        key
      }
      assignedBugs {
        summary
        key
      }
    }
  }
`;

const UserInfo = () => {
  const { userId } = useParams();
  const { loading, data } = useQuery(GET_USER, {
    variables: { userId },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SingleColumnFlex>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <div>
        <ListContainer>
          <h4>
            Name:{' '}
            <Avatar
              name={data.getUser.name}
              textSizeRatio={1}
              round
              size="30px"
              alt="Initials of Name Avatar Icon"
            />{' '}
            {data.getUser.name}
          </h4>
        </ListContainer>
        <ListContainer>
          <h4>Member of Projects:</h4>
          <StyledList>
            {data.getUser.memberOfProjects.length > 0 ? (
              data.getUser.memberOfProjects.map((project) => (
                <StyledListItem key={project.projectKey}>
                  <StyledLink to={`/project/${project.projectKey}`}>
                    {project.projectName}
                  </StyledLink>
                </StyledListItem>
              ))
            ) : (
              <p>This user is not a member of any projects.</p>
            )}
          </StyledList>
        </ListContainer>
        <ListContainer>
          <h4>Created Bugs</h4>
          <StyledList>
            {data.getUser.createdBugs.length > 0 ? (
              data.getUser.createdBugs.map((bug) => (
                <StyledListItem key={bug.key}>
                  <StyledLink to={`/bug/${bug.key}`}>{bug.summary}</StyledLink>
                </StyledListItem>
              ))
            ) : (
              <p>This user has no created bugs.</p>
            )}
          </StyledList>
        </ListContainer>
        <ListContainer>
          <h4>Assigned Bugs</h4>
          <StyledList>
            {data.getUser.assignedBugs.length > 0 ? (
              data.getUser.assignedBugs.map((bug) => (
                <StyledLink to={`/bug/${bug.key}`}>{bug.summary}</StyledLink>
              ))
            ) : (
              <p>This user has no assigned bugs.</p>
            )}
          </StyledList>
        </ListContainer>
      </div>
    </SingleColumnFlex>
  );
};

export default UserInfo;

const ListContainer = styled.div`
  margin-bottom: 0.5rem;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li`
  padding: 0.25rem;
`;
