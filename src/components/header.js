import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'

export default () => (
	<div className="header">
		<p>bucketlist</p>
		<div className="links-div">
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
		</div>
	</div>
)