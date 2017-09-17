import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default () => (
	  <Navbar>
	    <Navbar.Header>
	      <Navbar.Brand>
	        <Link to="/">bucketlist</Link>
	      </Navbar.Brand>
	    </Navbar.Header>

	    <Nav pullRight>
	      <NavItem><Link to="/login">Login</Link></NavItem>
	      <NavItem><Link to="/register">Register</Link></NavItem>
	    </Nav>
	   </Navbar>
)