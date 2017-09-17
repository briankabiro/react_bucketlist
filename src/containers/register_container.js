import React, {Component} from 'react';
import axios from 'axios';
import { Col } from 'react-bootstrap'
import Header from '../components/header';
import RegisterForm from '../components/register_form';

export default class Register extends Component{
	constructor(props){
		super();
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			error: "",
			message:""
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
		}).then((response) => {
			this.setState({
				message: response.data.message
			})
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
			<div>
				<Header />
				<Col md = {5} mdPush={3} >
					<h4 className="text-center">Register</h4>
					{this.state.message}
					<RegisterForm />
					<p>{this.state.error}</p>
				</Col>
			</div>
		)
	}
}