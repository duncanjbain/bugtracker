import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AscSortIcon } from '../../assets/svg/icons/sort-ascending.svg';
import { ReactComponent as DescSortIcon } from '../../assets/svg/icons/sort-descending.svg';

const SortIcon = ({ sortOrder }) => {
  if (sortOrder === 'ascending') {
    return <StyledAscIcon />;
  }
  if (sortOrder === 'descending') {
    return <StyledDescIcon />;
  }
  return <StyledAscIcon />;
};

export default SortIcon;

const StyledAscIcon = styled(AscSortIcon)`
  height: 1rem;
  width: auto;
`;

const StyledDescIcon = styled(DescSortIcon)`
  height: 1rem;
  width: auto;
`;
