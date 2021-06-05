/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.link};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.dark};
    text-decoration: underline;
  }
`;
