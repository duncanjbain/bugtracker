import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.article`
grid-area: mybugs;
  display: flex;
`;

// eslint-disable-next-line arrow-body-style
const DashboardMyBugsCard = () => {
  return (
    <CardWrapper>
      <h3>My Bugs</h3>
    </CardWrapper>
  );
};

export default DashboardMyBugsCard;
