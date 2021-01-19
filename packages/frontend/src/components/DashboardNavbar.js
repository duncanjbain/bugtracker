import React from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import {ReactComponent as NotificationIcon} from '../assets/svg/icons/bell.svg'
import {ReactComponent as SettingsIcon} from '../assets/svg/icons/settings.svg'


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
        <NavLink href="#">Search</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#"><StyledNotificationIcon alt='Bell Notification Icon' aria-label="Link to Notifications" /></NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#"><StyledSettingsIcon alt='Cog Wheel Settings Icon' aria-label="Link to Settings"/></NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#"><Avatar name="Duncan Bain" round size="30px" alt="Initials of Name Avatar Icon" /></NavLink>
      </NavItem>
    </NavLinks>
  </NavContainer>
);

export default DashboardNavbar;

const NavContainer = styled.nav`
 grid-area: header;
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,.2);
`;

const NavLinks = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const NavItem = styled.li`
  padding: 0.5rem;
`;

const NavLink = styled.a`
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
`;

const StyledNotificationIcon = styled(NotificationIcon)`
  display: inline-block;
  vertical-align: text-bottom;
`;


const StyledSettingsIcon = styled(SettingsIcon)`
  display: inline-block;
  vertical-align: text-bottom;
`;
