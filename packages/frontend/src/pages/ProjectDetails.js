import React from 'react';
import Avatar from 'react-avatar';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { WideSingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import { StyledLink } from '../ui/typography';
import LoadingSpinner from '../ui/components/LoadingSpinner';
import BugsTableList from '../components/table/BugsTableList';

const GET_PROJECT = gql`
  query GetProject($searchKey: String!) {
    getProject(searchKey: $searchKey) {
      projectName
      id
      projectKey
      projectLead {
        name
        id
      }
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
      <div>
        <div>
          <p>
            Project Lead -{' '}
            {
              <Avatar
                name={data.getProject.projectLead.name}
                round
                textSizeRatio="1"
                size="30px"
                alt="Initials of Name Avatar Icon"
              />
            }{' '}
            {data.getProject.projectLead.name}
          </p>
        </div>
      </div>
      {data.getProject.projectBugs > 0 ? (
        <div style={{ overflowX: 'scroll' }}>
          <BugsTableList
            bugs={data.getProject.projectBugs}
            title="Project Bugs"
          />
        </div>
      ) : (
        <div>
          <p>
            This project does not have any bugs to track! Try adding some{' '}
            <StyledLink to="/createbug">here</StyledLink>!
          </p>
        </div>
      )}
    </WideSingleColumnFlex>
  );
};

export default ProjectDetails;
