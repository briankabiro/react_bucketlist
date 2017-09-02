import React, {Component} from 'react'
import Header from '../components/header'
import axios from 'axios'

export default class Dashboard extends Component{
	constructor(props){
		super();
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			bucketlists: ""
		}
	}

	handleSubmit(event){
		// event handler when the form is submitted
		event.preventDefault();
		let data = new FormData(event.target);
		let name = JSON.stringify(data.get('name'));
		
		axios.post('http://localhost:5000/bucketlists/', {
			name:name
		}).then((data) => {
			console.log('this is data', data)
		}).catch((err) => {
			console.error("return err", err)
		})
	}
	render(){
		<div>
			<Header />
			<form onSubmit={this.handleSubmit}>
				<input type="text" name="name" placeholder="Add name of the bucketlist"/>
				<button type="submit">Create</button>
			</form>
			<h3>Your Bucketlists</h3>
		</div>
	}
}