import React from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { ReactComponent as NotificationIcon } from '../../assets/svg/icons/bell.svg';
import { ReactComponent as SettingsIcon } from '../../assets/svg/icons/settings.svg';
import { useAuth } from '../../context/AuthContext';

const DashboardNavbar = () => {
  const { logout } = useAuth();

  return (
    <NavContainer>
      <NavLinks>
        <NavItem>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/projects">Projects</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/createbug">Create bug</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/createproject">Create project</NavLink>
        </NavItem>
      </NavLinks>
      <NavLinks>
        <NavItem>
          <NavLink to="#">Search</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="#">
            <StyledNotificationIcon
              alt="Bell Notification Icon"
              aria-label="Link to Notifications"
            />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="#">
            <StyledSettingsIcon
              alt="Cog Wheel Settings Icon"
              aria-label="Link to Settings"
            />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/profile">
            <Avatar
              name="Duncan Bain"
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
    justify-content: space-between;
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
    padding: 0;
  }
`;

const StyledNotificationIcon = styled(NotificationIcon)`
  display: inline-block;
  vertical-align: text-bottom;
`;

const StyledSettingsIcon = styled(SettingsIcon)`
  display: inline-block;
  vertical-align: text-bottom;
`;
