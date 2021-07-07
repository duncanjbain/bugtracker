import React from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { useUser } from '../../context/UserContext';
import {
  CardWrapper,
  CardTitle,
  CardHeader,
} from '../../ui/components/StyledDashboardCard';
import { StyledLink } from '../../ui/typography';
import ProjectTableList from '../table/ProjectTableList';
import LoadingSpinner from '../../ui/components/LoadingSpinner';
import { ReactComponent as ReloadIcon } from '../../assets/svg/icons/refresh-ccw.svg';

const GET_PROJECTS = gql`
  query getUserProjects($userID: ID!) {
    getUserProjects(userID: $userID) {
      id
      projectName
      projectKey
      projectLead {
        id
        name
      }
    }
  }
`;

// eslint-disable-next-line consistent-return
const DashboardProjectsCard = () => {
  const user = useUser();
  const { loading, data, refetch, networkStatus } = useQuery(GET_PROJECTS, {
    variables: { userID: user.id },
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === 4 || loading) {
    return (
      <CardWrapper>
        <CardHeader>
          <CardTitle>My Projects</CardTitle>
          <StyledButton
            type="button"
            aria-label="Reload projects"
            onClick={() => refetch()}
          >
            <StyledReloadIcon />
          </StyledButton>
        </CardHeader>
        <LoadingSpinner />
      </CardWrapper>
    );
  }

  if (data) {
    return (
      <CardWrapper
        data-cy="projectcard-container"
        style={{ overflowX: 'scroll' }}
      >
        <CardHeader>
          <CardTitle>My Projects</CardTitle>
          <StyledButton
            type="button"
            aria-label="Reload projects"
            onClick={() => refetch()}
          >
            <StyledReloadIcon />
          </StyledButton>
        </CardHeader>
        <div>
          {data.getUserProjects.length > 0 ? (
            <ProjectTableList projects={data.getUserProjects} />
          ) : (
            <p>
              You currently do not have any projects added! Try addding one{' '}
              <StyledLink data-cy="createproject-link" to="/createproject">
                here
              </StyledLink>
              !
            </p>
          )}
        </div>
      </CardWrapper>
    );
  }
};

export default DashboardProjectsCard;

const StyledReloadIcon = styled(ReloadIcon)`
  display: inline-block;
  vertical-align: middle;
  width: 1rem;
  height: 1rem;
  outline: none;
  transition: transform 0.15s linear;
`;

const StyledButton = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    svg {
      transform: scale(1.1);
    }
  }
`;
