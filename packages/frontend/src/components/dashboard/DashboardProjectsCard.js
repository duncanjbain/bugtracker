import React from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { useUser } from '../../context/UserContext';
import {
  CardWrapper,
  CardTitle,
  CardHeader,
} from '../../ui/components/StyledDashboardCard';
import DashboardProjectsCardList from './DashboardProjectsCardList';
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
    // eslint-disable-next-line no-underscore-dangle
    variables: { userID: user.id },
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === 4 || loading) {
    return (
      <CardWrapper gridArea="projects">
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
      <CardWrapper gridArea="projects">
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
          <DashboardProjectsCardList projects={data.getUserProjects} />
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
