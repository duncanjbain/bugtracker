import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ReloadIcon } from '../assets/svg/icons/refresh-ccw.svg';

const CardWrapper = styled.article`
  grid-area: mybugs;
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
  border-radius: 3px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  border-top: 5px solid ${(props) => props.theme.colors.primary};
  color: #4a4a4a;
  padding-top: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
`;

const CardTitle = styled.h3`
  font-weight: 600;
  margin-right: 0.75rem;
  margin-bottom: 0.75rem;
`;

const StyledReloadIcon = styled(ReloadIcon)`
  display: inline-block;
  vertical-align: text-bottom;
  width: 16px;
  height: 16px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`;

const BugListTable = styled.table`
border-collapse: collapse;
`;

const BugListTableHeader = styled.th`
  text-align: left;
`;

const BugListTableRow = styled.tr`
  &:hover {
    background: ${(props) => props.theme.colors.light};
  }
`;

const BugListTableLink = styled.a`
  color: ${props => props.theme.colors.link};
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.colors.dark};
    text-decoration: underline;
  }
`;

// eslint-disable-next-line arrow-body-style
const DashboardMyBugsCard = () => {
  return (
    <CardWrapper>
      <CardHeader>
        <CardTitle><a href="https://localhost/bugs/user" >My Bugs</a></CardTitle>
        <StyledReloadIcon />
      </CardHeader>
      <BugListTable>
        <BugListTableRow>
          <BugListTableHeader>Key</BugListTableHeader>
          <BugListTableHeader>Summary</BugListTableHeader>
          <BugListTableHeader>Priority</BugListTableHeader>
          <BugListTableHeader>Due</BugListTableHeader>
        </BugListTableRow>
        <BugListTableRow>
          <td>
            <BugListTableLink href="https://localhost/#">KEY-1</BugListTableLink>
          </td>
          <td>
            <BugListTableLink href="https://localhost/#">First Example Bug</BugListTableLink>
          </td>
          <td>High</td>
          <td>25/01/2021</td>
        </BugListTableRow>
        <BugListTableRow>
          <td>KEY-1</td>
          <td>First Example Bug</td>
          <td>High</td>
          <td>25/01/2021</td>
        </BugListTableRow>
        <BugListTableRow>
          <td>KEY-1</td>
          <td>First Example Bug</td>
          <td>High</td>
          <td>25/01/2021</td>
        </BugListTableRow>
        <BugListTableRow>
          <td>KEY-1</td>
          <td>First Example Bug</td>
          <td>High</td>
          <td>25/01/2021</td>
        </BugListTableRow>
        <BugListTableRow>
          <td>KEY-1</td>
          <td>First Example Bug</td>
          <td>High</td>
          <td>25/01/2021</td>
        </BugListTableRow>
        <BugListTableRow>
          <td>KEY-1</td>
          <td>First Example Bug</td>
          <td>High</td>
          <td>25/01/2021</td>
        </BugListTableRow>
      </BugListTable>
    </CardWrapper>
  );
};

export default DashboardMyBugsCard;
