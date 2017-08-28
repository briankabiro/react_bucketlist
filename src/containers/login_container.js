import React, {Component} from 'react';
import Header from '../components/header';
import LoginForm from '../components/login_form';

export default class Login extends Component{
	render(){
		return (
		<div>
			<Header />
			<div>
				<LoginForm />
			</div>
		</div>
		)
	}
}