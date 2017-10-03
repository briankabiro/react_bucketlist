import React from 'react';
import { Navbar, NavbarBrand, Button, Nav, NavItem } from 'reactstrap';
import '../styles/dashboard_header.css';

export default props => (
  <Navbar className="flex-row justify-content-between" color="faded" light>
    <NavbarBrand href="/bucketlists">Dashboard</NavbarBrand>
    <Nav navbar className="flex-row justify-content-around">

      <NavItem className="mr-1">
        <input
          onChange={props.onSearch}
          className="search-bar"
          name="search"
          type="text"
          placeholder="search"
          required
        />
      </NavItem>

  <NavItem className="ml-2">
    <Button onClick={props.logout} color="danger">Logout</Button>
      </NavItem>
    </Nav>
  </Navbar>
);
