import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
`;

const NavLinks = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  padding: 0.5rem;
`;

const NavLink = styled.a`
  color: ${(props) => props.theme.colors.light};
  padding: 0.5rem;
  display: block;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.white};
    background-color: #00b89c;
    transition: all 0.15s ease-in;
  }
`;

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
