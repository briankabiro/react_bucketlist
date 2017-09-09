import React from 'react';

import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

import Home from './home'
import Register from './register_container';
import Login from './login_container';
import Dashboard from './dashboard';
import PrivateRoute from './private';

export default () => (
	<Router>
		<div>
			<Route exact path="/" component={Home}/>
			<Route path="/register" component={Register}/>
			<Route path="/login" component={Login}/>
			<PrivateRoute path="/dashboard" component={Dashboard}/>
		</div>
	</Router>
)


