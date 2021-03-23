import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

import { SingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import LoadingSpinner from '../ui/components/LoadingSpinner';

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
    }
  }
`;

const BugDetails = () => {
  const { bugKey } = useParams();

  const { data, loading, networkStatus } = useQuery(GET_BUG, {
    variables: { bugKey },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });

  if (networkStatus === 4 || loading) {
    return <LoadingSpinner />;
  }

  const createdOn = new Date(parseInt(data.getBugByKey.created, 10));

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
      <StyledSummary>{data.getBugByKey.summary}</StyledSummary>
      <div>
        <StyledDescription>Description</StyledDescription>
        <StyledArticle>
          <MDEditor.Markdown source={data.getBugByKey.description} />
        </StyledArticle>
      </div>
      <div>
        <StyledInfo>
          Assigned to{' '}
          <StyledLink to={`/user/${data.getBugByKey.assignee.id}`}>
            {data.getBugByKey.assignee.name}
          </StyledLink>
        </StyledInfo>
        <StyledInfo>
          Authored by{' '}
          <StyledLink to={`/user/${data.getBugByKey.author.id}`}>
            {data.getBugByKey.author.name}
          </StyledLink>
        </StyledInfo>
      </div>
      <div>
        <StyledInfo>
          Created{' '}
          {createdOn.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          ,{' '}
          {createdOn.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </StyledInfo>
      </div>
    </SingleColumnFlex>
  );
};

export default BugDetails;

const StyledDescription = styled.h4`
  margin: 0px;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const StyledInfo = styled.p`
  margin-bottom: 1rem;
`;

const StyledSummary = styled.h3`
  margin: 0px;
  margin-bottom: 1rem;
`;

const StyledArticle = styled.article`
  border: 1px solid;
  border-color: hsl(0, 0%, 96%);
  padding: 1rem;
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
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
