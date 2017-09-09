import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Header from '../components/header';
import LoginForm from '../components/login_form';
import '../styles/register.css';

export default class Login extends Component{
	constructor(props){
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			redirect: false,
			error: ""
		}
	}

	handleSubmit(event){
		// event handler when the form is submitted
		event.preventDefault();
		let data = new FormData(event.target);
		let username = data.get('username');
		let password = data.get("password");
		console.log(username, password)
		
		axios.post('http://localhost:5000/auth/login', {
			username: username,
			password: password
		}).then((response) => {
			this.setState({
				redirect: true
			})
			localStorage.setItem('token', response.data.token)
		}).catch((err) => {
			if (err.response) {
				// flash the err.message
				console.log(err.response.status)
				console.log(err.response.data)
			}else{
				console.error("returns error", err)				
			}		
		})
	}

	render(){
		const { redirect } = this.state

		if (redirect) {
			return <Redirect to='/dashboard' />
		}
		return (
			<div>
				<Header />
				<div>
					<h4>Login</h4>
					<LoginForm handleSubmit = {this.handleSubmit} />
					<p>Don't have an account? Sign Up Here</p>
				</div>
				<p>{this.state.error}</p>
			</div>
		)
	}
}