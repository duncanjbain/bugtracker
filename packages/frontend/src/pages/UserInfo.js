import React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import { gql, useQuery } from '@apollo/client';
import { SingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
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
        <div>
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
        </div>
        <div>
          <h4>Member of Projects:</h4>
          <ul>
            {data.getUser.memberOfProjects.length > 0 ? (
              data.getUser.memberOfProjects.map((project) => (
                <li>{project.projectName}</li>
              ))
            ) : (
              <p>This user is not a member of any projects.</p>
            )}
          </ul>
        </div>
        <div>
          <h4>Created Bugs</h4>
          {data.getUser.createdBugs.length > 0 ? (
            data.getUser.createdBugs.map((bug) => <li>{bug.summary}</li>)
          ) : (
            <p>This user has no created bugs.</p>
          )}
        </div>
        <div>
          <h4>Assigned Bugs</h4>
          {data.getUser.assignedBugs.length > 0 ? (
            data.getUser.assignedBugs.map((bug) => <li>{bug.summary}</li>)
          ) : (
            <p>This user has no assigned bugs.</p>
          )}
        </div>
      </div>
    </SingleColumnFlex>
  );
};

export default UserInfo;
