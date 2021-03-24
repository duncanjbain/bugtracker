import React from 'react';
import styled from 'styled-components';
import DashboardMyBugsCard from '../components/dashboard/DashboardMyBugsCard';
import DashboardProjectsCard from '../components/dashboard/DashboardProjectsCard';

const Dashboard = () => (
  <DashboardWrapper>
    <DashboardProjectsCard />
    <DashboardMyBugsCard />
  </DashboardWrapper>
);

export default Dashboard;

const DashboardWrapper = styled.main`
  display: flex;
  flex-direction: column;
`;
