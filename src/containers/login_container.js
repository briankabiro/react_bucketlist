import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Header from '../components/header';
import LoginForm from '../components/login_form';
import { Col, Alert } from 'react-bootstrap'
import '../styles/register.css';

export default class Login extends Component{
	constructor(props){
		super()
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
		this.onDismissSuccess = this.onDismissSuccess.bind(this)
		this.state = {
			redirect: false,
			error: "",
			alert:null
		}
	}

	onDismiss(){
		// event handler when the form is submitted
		this.setState({ visible: false})
	}

	onDismissSuccess(){
		this.setState({
			alert: showAlert()
		})
	}


	handleSubmit(event){
		// event handler when the form is submitted
		event.preventDefault();
		let data = new FormData(event.target);
		let username = data.get('username');
		let password = data.get("password");

		axios.post('http://localhost:5000/auth/login', {
			username: username,
			password: password
		}).then((response) => {
			localStorage.setItem('token', response.data.token)
		}).then(() => {
			this.setState({
				redirect: true
			})
		}).catch((err) => {
			if (err.response) {
				this.setState({
					error: err.response.data.message
				})
				this.alertError()
			}else{
				console.error("returns error", err)				
			}		
		})
	}

	render(){
		const { redirect } = this.state

		if (redirect) {
			return <Redirect to='/bucketlists' />
		}

		return (
			<div>
				<Header />
				<div>
					<h4 className="text-center">Login</h4>
					<Col md = {5} mdPush={3}>
						<LoginForm handleSubmit = {this.handleSubmit} />
					</Col>
					<p>Don't have an account? Sign Up Here</p>
				</div>
		        <p>{this.state.error}</p>
		        <Col md={1} mdPush={3}>
		        	{this.state.alert}
		        </Col>
			</div>
		)
	}
}