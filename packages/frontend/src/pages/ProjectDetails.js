import React, { useState } from 'react';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
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

const GET_PROJECT_MEMBERS = gql`
  query GetProjectMembers($projectKey: String!) {
    getProjectMembers(projectKey: $projectKey) {
      id
      name
    }
  }
`;

const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      name
      memberOfProjects {
        projectKey
        projectName
      }
    }
  }
`;

const ProjectDetails = () => {
  const { projectKey } = useParams();
  const getProject = useQuery(GET_PROJECT, {
    variables: { searchKey: projectKey },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });

  const getProjectMembers = useQuery(GET_PROJECT_MEMBERS, {
    variables: { projectKey },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });

  const [getAllUsers, { data: dataUsers }] = useLazyQuery(GET_ALL_USERS, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });

  const [isListShown, setListShown] = useState(false);

  const handleUserList = () => {
    getAllUsers();
    console.log('users', dataUsers);
    setListShown(true);
  };

  if (getProject.loading || getProjectMembers.loading) {
    return <LoadingSpinner />;
  }

  return (
    <WideSingleColumnFlex>
      <CardHeader>
        <CardTitle>{getProject.data.getProject.projectName}</CardTitle>
      </CardHeader>
      <div>
        <ProjectMembersListContainer>
          <h4>Project Lead</h4>
          <ProjectLeadItem>
            <Avatar
              name={getProject.data.getProject.projectLead.name}
              round
              textSizeRatio={1}
              size="30px"
              alt="Initials of Name Avatar Icon"
            />
            {getProject.data.getProject.projectLead.name}
          </ProjectLeadItem>
        </ProjectMembersListContainer>
        <ProjectMembersListContainer>
          <h4>Project Members</h4>
          <ProjectMembersList>
            {getProjectMembers.data.getProjectMembers.map((member) => (
              <ProjectMemberListItem>
                <Avatar
                  name={member.name}
                  round
                  textSizeRatio="1"
                  size="30px"
                  alt="Initials of Name Avatar Icon"
                />{' '}
                {member.name}
              </ProjectMemberListItem>
            ))}
            <ProjectMemberListItem>
              <button onClick={() => handleUserList()} type="button">
                Add user to project
              </button>
              {isListShown && dataUsers ? (
                <select>
                  {dataUsers.getAllUsers
                    .filter((allUser) =>
                      getProjectMembers.data.getProjectMembers.every(
                        (projectMember) =>
                          !projectMember.name.includes(allUser.name)
                      )
                    )
                    .map((filteredUser) => (
                      <option key={filteredUser.id} value={filteredUser.id}>
                        {filteredUser.name}
                      </option>
                    ))}
                </select>
              ) : null}
            </ProjectMemberListItem>
          </ProjectMembersList>
        </ProjectMembersListContainer>
      </div>
      {getProject.data.getProject.projectBugs.length > 0 ? (
        <div style={{ overflowX: 'scroll' }}>
          <BugsTableList
            bugs={getProject.data.getProject.projectBugs}
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

const ProjectMembersListContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.75rem;
  width: 100%;
`;

const ProjectLeadItem = styled.div`
  margin-left: 0.75rem;
  margin-right: 0.75rem;
`;

const ProjectMembersList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
`;

const ProjectMemberListItem = styled.li`
  margin-left: 0.75rem;
  margin-right: 0.75rem;
`;
