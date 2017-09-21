import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand,  Nav , NavItem} from 'reactstrap';

export default () => (
	<Navbar className="flex-row justify-content-between" color="faded" light>
			<NavbarBrand href="/">bucketlists</NavbarBrand>
				<Nav navbar className="flex-row justify-content-around">

					<NavItem className="mr-2">
						<Link to="/login">Login</Link>
					</NavItem>

					<NavItem className="ml-3">
						<Link to="/register">Register</Link>
					</NavItem>
				</Nav>
		</Navbar>
)
