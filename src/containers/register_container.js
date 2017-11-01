import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Col, Alert } from 'reactstrap';
import Header from '../components/header';
import RegisterForm from '../components/register_form';

export default class Register extends Component {
	// class for Register component
	constructor(props) {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
		this.state = {
			error: "",
			message:"",
			visible: false,
			redirect: false
		}
	}

	onDismiss() {
		// function for disabling the error alert
		this.setState({ visible: false})
	}

	handleSubmit(event) {
		// event handler when the form is submitted
		event.preventDefault();
		let data = new FormData(event.target);

		let username = data.get('username');
		let password = data.get('password');
		axios.post('http://localhost:5000/auth/register', {
			username: username,
			password: password
		}).then((response) => {
			this.setState({
				message: response.data.message,
				redirect: true
			})
		}).catch((err) => {
			if (err.response){
				this.setState({
					error: err.response.data.message,
					visible: true
				})
			}
		})
	}

	render() {
		return (
			<div>
				<Header />
				<Col md = {5} mdPush={3} >
					<h4 className="text-center">Register</h4>
					{this.state.message}
					<RegisterForm handleSubmit={this.handleSubmit} />
				</Col>
			</div>
		)
	}
}
