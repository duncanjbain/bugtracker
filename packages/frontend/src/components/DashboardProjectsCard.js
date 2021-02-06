import React from 'react';
import styled, {useTheme} from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import PulseLoader from "react-spinners/PulseLoader";
import { useUser } from '../context/UserContext';
import {
  CardWrapper,
  CardTitle,
  CardHeader,
} from '../ui/components/StyledDashboardCard';
import { ReactComponent as ReloadIcon } from '../assets/svg/icons/refresh-ccw.svg';

const GET_PROJECTS = gql`
  query getUserProjects($userID: String!) {
    getUserProjects(userID: $userID) {
      _id
      projectName
      projectLead {
        username
      }
    }
  }
`;

// eslint-disable-next-line consistent-return
const DashboardProjectsCard = () => {
  const theme = useTheme
  const user = useUser();
  const { loading, data, refetch, networkStatus } = useQuery(GET_PROJECTS, {
    // eslint-disable-next-line no-underscore-dangle
    variables: { userID: user._id },
    notifyOnNetworkStatusChange: true,
  });

  // eslint-disable-next-line no-undef
  if (networkStatus === 4) return <PulseLoader loading="true" color={theme.colors.primary} />;
  if (loading) {
    return <p>Loading</p>;
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
          <ul>
            {data.getUserProjects.map((project) => (
              <li key={project._id}>{project.projectName}</li>
            ))}
          </ul>
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
    outline:none;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    svg {
      transform: scale(1.1);
    }
  }
`;
