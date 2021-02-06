import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const StyledTableHeader = styled.th`
  text-align: left;
`;

export const StyledTableRow = styled.tr`
  &:hover {
    background: ${(props) => props.theme.colors.light};
  }
`;

export const StyledTableLink = styled(Link)`
  color: ${(props) => props.theme.colors.link};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.dark};
    text-decoration: underline;
  }
`;
