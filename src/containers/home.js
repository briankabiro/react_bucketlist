import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../styles/home.css';

export default () => (
	<div className="body">
		<div className="nav-bar">
			<h1>Bucketlist</h1>
			<div className="right-nav-links">
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</div>
		</div>

		<div className="content">
			<p>Create the bucketlist of your dreams</p>
			<Link to="/register"><Button color="primary">Register</Button></Link>
		</div>
	</div>
)
