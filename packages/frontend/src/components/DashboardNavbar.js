import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.ul`
  display: flex;
  padding-left: 0;
`;

const NavItem = styled.li`
  list-style: none;
  padding: 0.5rem;
`;

const NavLink = styled.a``;

const DashboardNavbar = () => (
  <NavContainer>
    <NavLinks>
      <NavItem>
        <NavLink href="#">Dashboard</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Projects</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Add</NavLink>
      </NavItem>
    </NavLinks>
    <NavLinks>
      <NavItem>
        <NavLink href="#">Notifications</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Search</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Profile</NavLink>
      </NavItem>
    </NavLinks>
  </NavContainer>
);

export default DashboardNavbar;
