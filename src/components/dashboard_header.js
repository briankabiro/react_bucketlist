import React from 'react'
import { Navbar, NavbarBrand, Button, Nav , NavItem} from 'reactstrap';
import '../styles/dashboard_header.css';

export default (props) => (
	<Navbar className="flex-row justify-content-between" color="faded" light>
			<NavbarBrand href="/bucketlists">Dashboard</NavbarBrand>
				<Nav navbar className="flex-row justify-content-around">

					<NavItem className="mr-1">
						<form onSubmit={props.onSearch}>
							<input className="search-bar" minLength="3" name="search" type="text" placeholder="search" title="3 characters needed" pattern=".{3,}" required/>
						</form>
					</NavItem>

					<NavItem className="ml-2">
						<Button onClick={props.logout} color="warning">Logout</Button>
					</NavItem>
				</Nav>
		</Navbar>
)
