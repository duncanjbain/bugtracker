import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.article`
  grid-area: projects;
  display: flex;
  margin-left: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,.2);
  color: #4a4a4a;
  padding: 1rem;
  height: auto;
`;

// eslint-disable-next-line arrow-body-style
const DashboardProjectsCard = () => {
  return (
    <CardWrapper>
      <h3>Projects</h3>
    </CardWrapper>
  );
};

export default DashboardProjectsCard;
