import React from 'react';
import styled from 'styled-components';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardMyBugsCard from '../components/DashboardMyBugsCard';
import DashboardProjectsCard from '../components/DashboardProjectsCard'

const DashboardWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header'
    'projects  mybugs';
  grid-gap: 1rem;
`;

const Dashboard = () => (
  <DashboardWrapper>
    <DashboardNavbar />
    <DashboardMyBugsCard />
    <DashboardProjectsCard />
  </DashboardWrapper>
);

export default Dashboard;
