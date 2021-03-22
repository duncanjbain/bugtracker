import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import MDEditor from '@uiw/react-md-editor';

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
      }
      project {
        id
        projectName
      }
      assignee {
        name
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
      <h3 style={{ margin: '0px', marginBottom: '1rem' }}>
        {data.getBugByKey.summary}
      </h3>
      <div>
        <h4 style={{ margin: '0px', marginBottom: '0.5rem' }}>Description</h4>
        <article
          style={{
            border: '1px solid',
            borderColor: 'hsl(0, 0%, 96%)',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          <MDEditor.Markdown source={data.getBugByKey.description} />
        </article>
      </div>
      <div>
        <p style={{ marginBottom: '1rem' }}>
          Assigned to {data.getBugByKey.assignee.name}
        </p>
        <p style={{ marginBottom: '1rem' }}>Labels: None</p>
        <p style={{ marginBottom: '1rem' }}>
          Authored by {data.getBugByKey.author.name}
        </p>
        <hr
          style={{
            color: `${(props) => props.theme.colors.dark}`,
            backgroundColor: `${(props) => props.theme.colors.dark}`,
            height: 0.5,
            borderColor: `${(props) => props.theme.colors.dark}`,
            marginBottom: '1rem',
          }}
        />
      </div>
      <div>
        <p style={{ marginTop: '1rem', marginBottom: '1rem' }}>
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
        </p>
      </div>
    </SingleColumnFlex>
  );
};

export default BugDetails;
