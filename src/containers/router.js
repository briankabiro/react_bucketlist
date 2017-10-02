import React from 'react';

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import Home from './home'
import Register from './register_container';
import Login from './login_container';
import Dashboard from './dashboard';
import Item_Dashboard from './item_dashboard'
import PrivateRoute from './private';
import NoMatch from '../components/no_match';

export default () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route path="/register" component={Register}/>
			<Route path="/login" component={Login}/>
			<PrivateRoute path="/bucketlists/:id" component={Item_Dashboard} />
			<PrivateRoute path="/bucketlists" component={Dashboard}/>
			<Route component={NoMatch} />
		</Switch>
	</Router>
)
