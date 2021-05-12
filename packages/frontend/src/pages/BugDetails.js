import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

import { SingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import LoadingSpinner from '../ui/components/LoadingSpinner';
import ViewBugDetails from '../components/bug/ViewBugDetails';
import EditBugDetails from '../components/bug/EditBugDetails';

const GET_BUG = gql`
  query GetBugByKey($bugKey: String!) {
    getBugByKey(bugKey: $bugKey) {
      id
      key
      summary
      description
      priority
      author {
        name
        id
      }
      project {
        id
        projectName
        projectKey
      }
      assignee {
        name
        id
      }
      type
      created
      dateDue
    }
  }
`;

const BugDetails = () => {
  const [editMode, setEditMode] = useState(false);

  const { bugKey } = useParams();

  const { data, loading, networkStatus } = useQuery(GET_BUG, {
    variables: { bugKey },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });

  if (networkStatus === 4 || loading) {
    return <LoadingSpinner />;
  }

  return (
    <SingleColumnFlex>
      <CardHeader>
        <CardTitle>Bug Details</CardTitle>
      </CardHeader>
      <div style={{ marginBottom: '1rem' }}>
        <StyledBreadCrumbLink to="/projects">Projects</StyledBreadCrumbLink>
        <span> / </span>
        <StyledBreadCrumbLink
          to={`/project/${data.getBugByKey.project.projectKey}`}
        >
          {data.getBugByKey.project.projectKey}
        </StyledBreadCrumbLink>
        <span> / </span>
        <StyledBreadCrumbLink to={`/bug/${data.getBugByKey.key}`}>
          {data.getBugByKey.key}
        </StyledBreadCrumbLink>
      </div>
      {!editMode ? (
        <ViewBugDetails setEditMode={setEditMode} bug={data.getBugByKey} />
      ) : (
        <EditBugDetails bug={data.getBugByKey} />
      )}
    </SingleColumnFlex>
  );
};

export default BugDetails;

const StyledBreadCrumbLink = styled(Link)`
  &:first-child {
    padding-right: 0.5rem;
    padding-left: 0;
  }
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: ${(props) => props.theme.colors.link};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.dark};
    text-decoration: underline;
  }
  &:visited {
    text-decoration: none;
  }
`;
