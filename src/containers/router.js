import React from 'react';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

import Home from './home'
import Register from './register_container';
import Login from './login_container';

export default () => (
	<Router>
		<div>
			<ul>
				<li><Link to="/">Bucketlist</Link></li>
				<li><Link to="/login">Login</Link></li>
				<li><Link to="/register">Register</Link></li>
			</ul>

			<Route exact path="/" component={Home}/>
			<Route path="/register" component={Register}/>
			<Route path="/login" component={Login}/>
		</div>
	</Router>
)


