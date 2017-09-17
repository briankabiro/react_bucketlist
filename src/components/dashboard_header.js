import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'

export default () => (
	<Navbar>
	    <Navbar.Header>
	      <Navbar.Brand>
	        <Link to="/bucketlists">bucketlist</Link>
	      </Navbar.Brand>
	    </Navbar.Header>

	    <Nav pullRight>
	      <NavItem>Hello</NavItem>
	    </Nav>
	</Navbar>
)
