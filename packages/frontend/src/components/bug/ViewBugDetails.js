import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SubmitButton } from '../../ui/components/StyledForm';

const ViewBugDetails = ({ bug, setEditMode }) => {
  const createdOn = new Date(parseInt(bug.created, 10));
  const dueOn = new Date(parseInt(bug.dateDue, 10));
  return (
    <>
      <StyledSummary>{bug.summary}</StyledSummary>
      <div>
        <StyledDescription>Description</StyledDescription>
        <StyledArticle>
          <MDEditor.Markdown source={bug.description} />
        </StyledArticle>
      </div>
      <div>
        <StyledInfo>
          Assigned to{' '}
          <StyledLink to={`/user/${bug.assignee.id}`}>
            {bug.assignee.name}
          </StyledLink>
        </StyledInfo>
        <StyledInfo>
          Authored by{' '}
          <StyledLink to={`/user/${bug.author.id}`}>
            {bug.author.name}
          </StyledLink>
        </StyledInfo>
      </div>
      <div>
        <StyledInfo>
          Due On{' '}
          {dueOn.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
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

      <SubmitButton type="button" onClick={() => setEditMode(true)}>
        Edit
      </SubmitButton>
    </>
  );
};

export default ViewBugDetails;

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
