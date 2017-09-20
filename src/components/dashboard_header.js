import React from 'react'
import { Navbar, NavbarBrand, Button, Nav , NavItem} from 'reactstrap';
import '../styles/dashboard_header.css';
import logout from './logout';

export default (props) => (
	<Navbar color="faded" light>
			<NavbarBrand href="/bucketlists">bucketlists</NavbarBrand>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<form onSubmit={props.onSearch}>
							<input className="search-bar" minLength="3" name="search" type="text" placeholder="search" title="3 characters needed" pattern=".{3,}" required/>
						</form>
					</NavItem>

					<NavItem>
						<Button onClick={logout} color="warning">Logout</Button>
					</NavItem>
				</Nav>
		</Navbar>
)
