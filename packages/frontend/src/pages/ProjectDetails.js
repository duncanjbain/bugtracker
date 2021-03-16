import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { WideSingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import {
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableLink,
  StyledTableCell,
} from '../ui/components/StyledTable';
import LoadingSpinner from '../ui/components/LoadingSpinner';

const GET_PROJECT = gql`
  query GetProject($searchKey: String!) {
    getProject(searchKey: $searchKey) {
      projectName
      id
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
    return <LoadingSpinner />;
  }

  return (
    <WideSingleColumnFlex>
      <CardHeader>
        <CardTitle>{data.getProject.projectName}</CardTitle>
      </CardHeader>
      <div style={{ overflowX: 'scroll' }}>
        <StyledTable>
          <thead>
            <tr>
              <StyledTableHeader>Key</StyledTableHeader>
              <StyledTableHeader>Bug Summary</StyledTableHeader>
              <StyledTableHeader>Type</StyledTableHeader>
              <StyledTableHeader>Priority</StyledTableHeader>
              <StyledTableHeader>Created by</StyledTableHeader>
              <StyledTableHeader>Assignee</StyledTableHeader>
            </tr>
          </thead>
          <tbody>
            {data.getProject.projectBugs.map((bug) => (
              <StyledTableRow key={bug.key}>
                <StyledTableCell>
                  <StyledTableLink to={`/bug/${bug.key}`}>
                    {bug.key}
                  </StyledTableLink>
                </StyledTableCell>
                <StyledTableCell style={{ textTransform: 'capitalize' }}>
                  {' '}
                  <StyledTableLink to={`/bug/${bug.key}`}>
                    {bug.summary}
                  </StyledTableLink>
                </StyledTableCell>
                <StyledTableCell style={{ textTransform: 'capitalize' }}>
                  {bug.type}
                </StyledTableCell>
                <StyledTableCell style={{ textTransform: 'capitalize' }}>
                  {bug.priority}
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTableLink to={`/user/${bug.author.id}`}>
                    {bug.author.name}
                  </StyledTableLink>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTableLink to={`/user/${bug.assignee.id}`}>
                    {bug.assignee.name}
                  </StyledTableLink>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </tbody>
        </StyledTable>
      </div>
    </WideSingleColumnFlex>
  );
};

export default ProjectDetails;
