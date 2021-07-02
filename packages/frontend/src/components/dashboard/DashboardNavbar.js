import React from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

const DashboardNavbar = () => {
  const { logout } = useAuth();
  const user = useUser();
  return (
    <NavContainer data-cy="nav-container">
      <NavLinks>
        <NavItem>
          <NavLink data-cy="nav-dashboard" to="/dashboard">
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink data-cy="nav-projects" to="/projects">
            Projects
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink data-cy="nav-bugs" to="/createbug">
            Create bug
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink data-cy="nav-createproject" to="/createproject">
            Create project
          </NavLink>
        </NavItem>
      </NavLinks>
      <NavLinks>
        <NavItem>
          <NavLink data-cy="nav-profile" to="/profile">
            <span style={{ marginRight: '0.5rem' }}>Profile</span>
            <Avatar
              name={user.name}
              textSizeRatio={1}
              round
              size="30px"
              alt="Initials of Name Avatar Icon"
            />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={logout}>Logout</NavLink>
        </NavItem>
      </NavLinks>
    </NavContainer>
  );
};

export default DashboardNavbar;

const NavContainer = styled.nav`
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  @media (${(props) => props.theme.media.lg}) {
    flex-wrap: wrap;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  align-items: center;
  @media (${(props) => props.theme.media.lg}) {
    padding: 0.25rem;
    justify-content: space-around;
    width: 100%;
  }
`;

const NavItem = styled.li`
  padding: 0.5rem;
  @media (${(props) => props.theme.media.lg}) {
    padding: 0.25rem;
  }
`;

const NavLink = styled(Link)`
  border-radius: 5px;
  color: ${(props) => props.theme.colors.dark};
  padding: 0.5rem;
  display: block;
  text-decoration: none;
  font-weight: 600;
  &:hover {
    color: ${(props) => props.theme.colors.white};
    background-color: #00b89c;
    transition: all 0.15s ease-in;
  }
  @media (${(props) => props.theme.media.lg}) {
    padding: 0.25rem;
  }
`;
