import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Header from '../components/dashboard_header';
const apiUrl = 'http://localhost:5000/bucketlists/';

export default class ItemDashboard extends Component{
	constructor(props){
		super(props);
		this.get_items = this.get_items.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			items : [],
			error: "",
			redirect: false
		}
	}

	handleSubmit(event){
		event.preventDefault();
		let data = new FormData(event.target);
		let item_name = data.get('item_name');
		let id = this.props.match.params.id;

		axios({
			'url':apiUrl + id + "/items/",
			method:'post',
			data: {
				description: item_name
			},
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
		}).then(() => {
			this.get_items()
		}).catch((err) => {
			console.error("return err", err)
		})
	}

	get_items(){
		let id = this.props.match.params.id
		axios.get(apiUrl + id, {
			headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token')}
		}).then((response) => {
			this.setState({
				items: response.data.items
			})
		}).catch((err) => {
			if (err.response){
				this.setState({
					redirect: true
				})
			}
			console.error("Return Error", err)
		})	
	}

	componentDidMount(){
		//get the items
		this.get_items()
	}

	render(){
		<div>
			<Header />
			<form>
				<input type="text" placeholder="Add Item"/>
				<button type="submit">Add Item</button>
			</form>
			<h3>Items</h3>
			<div>
				{ items }
			</div>
		</div>
	}
}