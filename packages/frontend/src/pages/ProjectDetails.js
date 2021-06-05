import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { WideSingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import LoadingSpinner from '../ui/components/LoadingSpinner';
import BugsTableList from '../components/table/BugsTableList';

const GET_PROJECT = gql`
  query GetProject($searchKey: String!) {
    getProject(searchKey: $searchKey) {
      projectName
      id
      projectKey
      projectBugs {
        id
        key
        summary
        type
        priority
        assignee {
          name
          id
        }
        author {
          name
          id
        }
        project {
          projectName
          projectKey
        }
      }
    }
  }
`;

const ProjectDetails = () => {
  const { projectKey } = useParams();
  const { data, loading } = useQuery(GET_PROJECT, {
    variables: { searchKey: projectKey },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <WideSingleColumnFlex>
      <CardHeader>
        <CardTitle>{data.getProject.projectName}</CardTitle>
      </CardHeader>
      <div style={{ overflowX: 'scroll' }}>
        <BugsTableList
          bugs={data.getProject.projectBugs}
          title="Project Bugs"
        />
      </div>
    </WideSingleColumnFlex>
  );
};

export default ProjectDetails;
