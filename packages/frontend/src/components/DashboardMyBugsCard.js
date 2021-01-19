import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ReloadIcon } from '../assets/svg/icons/refresh-ccw.svg';
import {
  CardWrapper,
  CardTitle,
  CardHeader,
} from '../ui/components/StyledDashboardCard';

// eslint-disable-next-line arrow-body-style
const DashboardMyBugsCard = () => {
  return (
    <CardWrapper>
      <CardHeader>
        <CardTitle>
          <a href="https://localhost/bugs/user">My Bugs</a>
        </CardTitle>
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
            <BugListTableLink href="https://localhost/#">
              KEY-1
            </BugListTableLink>
          </td>
          <td>
            <BugListTableLink href="https://localhost/#">
              First Example Bug
            </BugListTableLink>
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

const StyledReloadIcon = styled(ReloadIcon)`
  display: inline-block;
  vertical-align: text-bottom;
  width: 16px;
  height: 16px;
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
  color: ${(props) => props.theme.colors.link};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.dark};
    text-decoration: underline;
  }
`;
