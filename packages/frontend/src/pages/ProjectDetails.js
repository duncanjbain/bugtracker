import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import SingleColumnFlex from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import {
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableLink,
} from '../ui/components/StyledTable';

const GET_PROJECT = gql`
  query GetProject($searchKey: String!) {
    getProject(searchKey: $searchKey) {
      projectName
      projectBugs {
        key
        summary
        assignee {
          username
        }
      }
    }
  }
`;

const ProjectDetails = () => {
  const { projectKey } = useParams();
  const { data, loading } = useQuery(GET_PROJECT, {
    variables: { searchKey: projectKey },
  });

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <SingleColumnFlex
      style={{
        width: 'auto',
        'margin-left': '1.5rem',
        'margin-right': '1.5rem',
      }}
    >
      <CardHeader>
        <CardTitle>Project - {data.getProject.projectName}</CardTitle>
      </CardHeader>
      <StyledTable>
        <thead>
          <StyledTableHeader>Key</StyledTableHeader>
          <StyledTableHeader>Bug Summary</StyledTableHeader>
          <StyledTableHeader>Assignee</StyledTableHeader>
        </thead>
        <tbody>
          {data.getProject.projectBugs.map((bug) => (
            <StyledTableRow>
              <td>
                <StyledTableLink to={`/bug/${bug.key}`}>
                  {bug.key}
                </StyledTableLink>
              </td>
              <td>{bug.summary}</td>
              <td>
                <StyledTableLink to={`/user/${bug.assignee._id}`}>
                  {bug.assignee.username}
                </StyledTableLink>
              </td>
            </StyledTableRow>
          ))}
        </tbody>
      </StyledTable>
    </SingleColumnFlex>
  );
};

export default ProjectDetails;
