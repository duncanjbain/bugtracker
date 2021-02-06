import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ReloadIcon } from '../assets/svg/icons/refresh-ccw.svg';
import {
  CardWrapper,
  CardTitle,
  CardHeader,
} from '../ui/components/StyledDashboardCard';
import {
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableLink,
} from '../ui/components/StyledTable';

// eslint-disable-next-line arrow-body-style
const DashboardMyBugsCard = () => {
  return (
    <CardWrapper gridArea="mybugs">
      <CardHeader>
        <CardTitle>
          <a href="https://localhost/bugs/user">My Bugs</a>
        </CardTitle>
        <StyledReloadIcon />
      </CardHeader>
      <StyledTable>
        <StyledTableRow>
          <StyledTableHeader>Key</StyledTableHeader>
          <StyledTableHeader>Summary</StyledTableHeader>
          <StyledTableHeader>Priority</StyledTableHeader>
          <StyledTableHeader>Due</StyledTableHeader>
        </StyledTableRow>
        <tbody>
          <StyledTableRow>
            <td>
              <StyledTableLink href="https://localhost/#">
                KEY-1
              </StyledTableLink>
            </td>
            <td>
              <StyledTableLink href="https://localhost/#">
                First Example Bug
              </StyledTableLink>
            </td>
            <td>High</td>
            <td>25/01/2021</td>
          </StyledTableRow>
          <StyledTableRow>
            <td>KEY-1</td>
            <td>First Example Bug</td>
            <td>High</td>
            <td>25/01/2021</td>
          </StyledTableRow>
          <StyledTableRow>
            <td>KEY-1</td>
            <td>First Example Bug</td>
            <td>High</td>
            <td>25/01/2021</td>
          </StyledTableRow>
          <StyledTableRow>
            <td>KEY-1</td>
            <td>First Example Bug</td>
            <td>High</td>
            <td>25/01/2021</td>
          </StyledTableRow>
          <StyledTableRow>
            <td>KEY-1</td>
            <td>First Example Bug</td>
            <td>High</td>
            <td>25/01/2021</td>
          </StyledTableRow>
          <StyledTableRow>
            <td>KEY-1</td>
            <td>First Example Bug</td>
            <td>High</td>
            <td>25/01/2021</td>
          </StyledTableRow>
        </tbody>
      </StyledTable>
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
