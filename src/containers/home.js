import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../styles/home.css';

export default () => (
	<div className="body">
		<div className="nav-bar">
			<h3>Bucketlist</h3>
			<div className="right-nav-links">
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</div>
		</div>

		<div className="content">
			<h2 className="content-h2">Bucketlist</h2>
			<p>Create the bucketlist of your dreams</p>
			<Link to="/register"><Button color="primary">Register</Button></Link>
		</div>
	</div>
)
