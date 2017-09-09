import React, {Component} from 'react';
import Header from '../components/header';
import axios from 'axios';
import '../styles/register.css'

export default class Register extends Component{
	constructor(props){
		super();
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			error: ""
		}
	}

	handleSubmit(event){
		// event handler when the form is submitted
		event.preventDefault();
		let data = new FormData(event.target);

		let username = data.get('username');
		let password = data.get("password");
		
		axios.post('http://localhost:5000/auth/register', {
			username: username,
			password: password	
		}).then((data) => {
			console.log('this is data', data)
		}).catch((err) => {
			if (err.response){
				this.setState({
					error: err.response.data.message
				})
			}
		})
	}

	render(){
		return (
			<div className='container'>
				<Header />
				<div>
					<h4>Register</h4>
					<form onSubmit={this.handleSubmit}>
						<label>Username</label>
						<input type="text" name="username" placeholder="Username"/>
						<label>Password</label>
						<input type="password"  name="password" placeholder="Password"/>
						<button type='submit'>Register</button>
					</form>
					<p>Have an account? Login here</p>
					<p>{this.state.error}</p>
				</div>
			</div>
		)
	}
}