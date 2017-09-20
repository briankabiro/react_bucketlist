import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand,  Nav , NavItem} from 'reactstrap';

export default () => (
	<Navbar color="faded" light>
			<NavbarBrand href="/">bucketlists</NavbarBrand>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<Link to="/login">Login</Link>
					</NavItem>

					<NavItem>
						<Link to="/register">Register</Link>
					</NavItem>
				</Nav>
		</Navbar>
)
