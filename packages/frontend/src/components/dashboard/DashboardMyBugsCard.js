import React from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { useUser } from '../../context/UserContext';
import { ReactComponent as ReloadIcon } from '../../assets/svg/icons/refresh-ccw.svg';
import BugsTableList from '../table/BugsTableList';
import {
  CardWrapper,
  CardTitle,
  CardHeader,
} from '../../ui/components/StyledDashboardCard';
import { StyledLink } from '../../ui/typography';

import LoadingSpinner from '../../ui/components/LoadingSpinner';

const GET_USERS_BUGS = gql`
  query GetUsersBugs($userId: ID!) {
    getUsersBugs(userId: $userId) {
      assignedBugs {
        key
        summary
        id
        priority
        type
        dateDue
        project {
          projectName
          projectKey
        }
      }
      createdBugs {
        key
        summary
        id
        priority
        type
        dateDue
        project {
          projectName
          projectKey
        }
      }
    }
  }
`;

// eslint-disable-next-line consistent-return
const DashboardMyBugsCard = () => {
  const user = useUser();

  const { loading, data, refetch, networkStatus } = useQuery(GET_USERS_BUGS, {
    variables: { userId: user.id },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });
  if (networkStatus === 4 || loading) {
    return (
      <CardWrapper>
        <CardHeader>
          <CardTitle>My Bugs</CardTitle>
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
      <CardWrapper data-cy="bugscard-container" style={{ overflowX: 'scroll' }}>
        <CardHeader>
          <CardTitle>My Bugs</CardTitle>
          <StyledButton
            type="button"
            aria-label="Reload projects"
            onClick={() => refetch()}
          >
            <StyledReloadIcon />
          </StyledButton>
        </CardHeader>
        {data.getUsersBugs.assignedBugs.length > 0 ||
        data.getUsersBugs.createdBugs.length > 0 ? (
          <>
            <BugsTableList
              title="Created by me"
              bugs={data.getUsersBugs.createdBugs}
            />
            <BugsTableList
              title="Assigned to me"
              bugs={data.getUsersBugs.assignedBugs}
            />
          </>
        ) : (
          <p>
            Your projects do not have any bugs to track! Try adding some{' '}
            <StyledLink to="/createbug">here</StyledLink>!
          </p>
        )}
      </CardWrapper>
    );
  }
};

export default DashboardMyBugsCard;

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
