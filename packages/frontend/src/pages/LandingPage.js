import React from 'react';
import styled from 'styled-components';
import { ReactComponent as BugFixLogo } from '../assets/svg/undraw_bug_fixing.svg';

const LandingPage = ({ RightSide }) => (
  <LandingPageContainer>
    <CallToAction data-cy="cta-container">
      <CtaHeader>Bug Tracker</CtaHeader>
      <CtaSubHeader>Track, manage and squash those bugs!</CtaSubHeader>
      <StyledBugFixLogo />
    </CallToAction>
    <RightSide />
  </LandingPageContainer>
);

export default LandingPage;

const LandingPageContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (${(props) => props.theme.media.lg}) {
    display: block;
  }
`;

const CallToAction = styled.aside`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 1rem;
`;

const CtaHeader = styled.h1`
  color: ${(props) => props.theme.colors.white};
  padding: 1rem;
  font-weight: bold;
  font-size: 3.75rem;
  line-height: 1;
`;

const CtaSubHeader = styled.h2`
  color: ${(props) => props.theme.colors.dark};
  padding: 1rem;
`;

const StyledBugFixLogo = styled(BugFixLogo)`
  width: 100%;
  height: auto;
`;
