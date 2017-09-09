import React, {Component} from 'react'
import Header from '../components/header'
import axios from 'axios'
import { Form } from 'react-bootstrap';


export default class Dashboard extends Component{
	constructor(props){
		super();
		this.handleSubmit = this.handleSubmit.bind(this)
		this.get_bucketlists = this.get_bucketlists.bind(this)
		this.state = {
			bucketlists: []
		}
	}

	get_bucketlists(){
		// returns the bucketlists that belong to a user
		axios.get('http://localhost:5000/bucketlists/', {
			headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token')}
		}).then((response) => {
			this.setState({
				bucketlists: response.data
			})
		}).catch((err) => {
			console.error("Return Error", err)
		})	
	}

	handleSubmit(event){
		// event handler when the form is submitted
		event.preventDefault();
		let data = new FormData(event.target);
		let name = data.get('name');

		axios({
			'url':'http://localhost:5000/bucketlists/',
			method:'post',
			data: {
				name: name
			},
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
		}).then(() => {
			this.get_bucketlists()
		}).catch((err) => {
			console.error("return err", err)
		})
	}

	componentDidMount(){
		// get the bucketlists
		this.get_bucketlists()
	}

	render(){
		let bucketlists = this.state.bucketlists
		return(
			<div>
				<Header />

				<Form onSubmit={this.handleSubmit}>
					<input type="text" name="name" placeholder="Add name of the bucketlist" required/>
					<button type="submit">Create</button>
				</Form>

				<h3>Your Bucketlists</h3>
					<div>
						{bucketlists.map(function(bucketlist){
							return(
								<p key={bucketlist.id}>{bucketlist.name}</p>
							)
						})}
					</div>
			</div>
		)
	}
}