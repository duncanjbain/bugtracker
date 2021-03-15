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
} from '../ui/components/StyledTable';
import LoadingSpinner from '../ui/components/LoadingSpinner';

const GET_PROJECT = gql`
  query GetProject($searchKey: String!) {
    getProject(searchKey: $searchKey) {
      projectName
      projectBugs {
        key
        summary
        type
        priority
        assignee {
          name
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
      <div style={{ overflow: 'auto' }}>
        <StyledTable>
          <thead>
            <StyledTableHeader>Key</StyledTableHeader>
            <StyledTableHeader>Bug Summary</StyledTableHeader>
            <StyledTableHeader>Type</StyledTableHeader>
            <StyledTableHeader>Priority</StyledTableHeader>
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
                <td style={{ textTransform: 'capitalize' }}>
                  {' '}
                  <StyledTableLink to={`/bug/${bug.key}`}>
                    {bug.summary}
                  </StyledTableLink>
                </td>
                <td style={{ textTransform: 'capitalize' }}>{bug.type}</td>
                <td style={{ textTransform: 'capitalize' }}>{bug.priority}</td>
                <td>
                  <StyledTableLink to={`/user/${bug.assignee.id}`}>
                    {bug.assignee.name}
                  </StyledTableLink>
                </td>
              </StyledTableRow>
            ))}
          </tbody>
        </StyledTable>
      </div>
    </WideSingleColumnFlex>
  );
};

export default ProjectDetails;
