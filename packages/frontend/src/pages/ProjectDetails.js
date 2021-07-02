/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useForm, Controller } from 'react-hook-form';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { WideSingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import { StyledLink } from '../ui/typography';
import LoadingSpinner from '../ui/components/LoadingSpinner';
import BugsTableList from '../components/table/BugsTableList';
import {
  FormGroup,
  TextInput,
  InputLabel,
  SmallSubmitButton,
  SmallSuccessButton,
} from '../ui/components/StyledForm';
import AddUserForm from '../components/project/AddUserForm';

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

  if (getProject.loading || getProjectMembers.loading) {
    return <LoadingSpinner />;
  }

  return (
    <WideSingleColumnFlex>
      <CardHeader>
        <CardTitle data-cy="projectTitle">
          {getProject.data.getProject.projectName}
        </CardTitle>
      </CardHeader>
      <div>
        <ProjectMembersListContainer data-cy="projectLead-container">
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
        <ProjectMembersListContainer data-cy="projectMembers-container">
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
                <p>{member.name}</p>
              </ProjectMemberListItem>
            ))}
          </ProjectMembersList>
        </ProjectMembersListContainer>
        <AddUserForm
          projectMembers={getProjectMembers.data.getProjectMembers}
          projectKey={getProject.data.getProject.projectKey}
          refetch={getProjectMembers.refetch}
        />
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
  align-items: center;
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
`;

const ProjectMemberListItem = styled.li`
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  display: flex;
`;
