import React, {Component} from 'react';
import Header from '../components/header';
import axios from 'axios';

export default class Login extends Component{
	constructor(props){
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event){
		// event handler when the form is submitted
		event.preventDefault();
		let data = new FormData(event.target);
		let username = JSON.stringify(data.get('username'));
		let password = JSON.stringify(data.get("password"));
		
		axios.post('http://localhost:5000/auth/login', {
			username: username,
			password: password
		}).then((response) => {
			console.log('this is data', response)
			console.log(response.data.token)
			console.log(response.status)
			axios.get('http://localhost:5000/bucketlists/', {
				headers:{
					'Authorization': "Bearer " + response.data.token
				},
			}).then((data) => {
				console.log('bucketlist data', data)
			})
		}).catch((err) => {
			if (err.response) {
				console.log(err.response.status)
				console.log(err.response.data)
			}else{
				console.error("returns error", err)				
			}		
		})
	}

	render(){
		return (
			<div>
				<Header />
				<div>
					<h4>Login</h4>
					<form onSubmit={this.handleSubmit}>
						<label>Username</label>
						<input type="text" name = "username" placeholder="Username"/>
						<label>Password</label>
						<input type="password" name = "password" placeholder="Password"/>
						<button type='submit'>Login</button>
					</form>
					<p>Don't have an account? Sign Up Here</p>
				</div>
			</div>
		)
	}
}