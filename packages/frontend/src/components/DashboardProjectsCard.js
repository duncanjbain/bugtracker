import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.article`
grid-area: projects;
  display: flex;
`;

// eslint-disable-next-line arrow-body-style
const DashboardProjectsCard = () => {
    return (
        <CardWrapper>
            <h3>Projects</h3>
        </CardWrapper>
    )
}

export default DashboardProjectsCard