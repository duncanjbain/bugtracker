import React from 'react';
import styled from 'styled-components';
import DashboardMyBugsCard from '../components/dashboard/DashboardMyBugsCard';
import DashboardProjectsCard from '../components/dashboard/DashboardProjectsCard';

const Dashboard = () => (
  <DashboardWrapper>
    <DashboardMyBugsCard />
    <DashboardProjectsCard />
  </DashboardWrapper>
);

export default Dashboard;

const DashboardWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header'
    'projects  mybugs';
`;
