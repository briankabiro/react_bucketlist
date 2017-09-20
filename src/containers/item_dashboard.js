import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';
import Header from '../components/dashboard_header';
import AddItemForm from '../components/add_item';
import '../styles/item_dashboard.css';

const apiUrl = 'http://localhost:5000/bucketlists/';

export default class ItemDashboard extends Component{
	constructor(props){
		super(props);
		this.get_items = this.get_items.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.deleteItem = this.deleteItem.bind(this)
		this.updateItemName = this.updateItemName.bind(this)
		this.toggleUpdateModal = this.toggleUpdateModal.bind(this)
		this.updateStatus = this.updateStatus.bind(this)
		this.state = {
			items : [],
			error: "",
			redirect: false,
			selectedItem: null,
			showModal: false
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

	deleteItem(item_id){
		let id = this.props.match.params.id;
		axios({
			'url':apiUrl + id + "/items/" + item_id,
			method:'delete',
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

	toggleUpdateModal(item_id){
		console.log('toggling...')
		this.setState({
			showModal: !this.state.showModal,
			selectedItem: item_id
		})
	}

	updateStatus(item_id, status){
		console.log(status)
		let id = this.props.match.params.id;
		axios({
			'url':apiUrl + id + "/items/" + item_id,
			method:'put',
			data: {
				done: JSON.stringify(!status)
			},
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
		}).then(() => {
			this.get_items()
		}).catch((err) => {
			console.error("return err", err)
			if (err.response){
				console.log(err.response.data)
			}
		})
	}

	updateItemName(event, item_id){
		console.log("updating...")
		let id = this.props.match.params.id;
		event.preventDefault();
		let data = new FormData(event.target);
		let new_name = data.get('name');
		axios({
			'url':apiUrl + id + "/items/" + item_id,
			method:'put',
			data: {
				description: new_name
			},
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
		}).then(() => {
			this.toggleUpdateModal()
			this.get_items()
		}).catch((err) => {
			console.error("return err", err)
		})
	}

	componentDidMount(){
		//get the items
		this.get_items()
	}

	render(){
		const {items} =  this.state
		const error = this.state.error
		const {redirect} = this.state
		const deleteItem = this.deleteItem
		const toggleUpdateModal = this.toggleUpdateModal
		if (redirect){
			return (<Redirect to="/x" />)
		}
		return(
			<div>
				<Header />
				<AddItemForm handleSubmit={this.handleSubmit} />
				<p>{ error }</p>
				<h3>Items</h3>
				<div>
					{items.map(function(item){
						return(
							<ListGroup key={item.id}>
								<ListGroupItem>
									<input type="checkbox"/>
									<span>{item.description}</span>
										<Button onClick={toggleUpdateModal}>Edit</Button>
										<Button onClick = {deleteItem.bind(this, item.id)} bsStyle="danger">Delete</Button>
								</ListGroupItem>
							</ListGroup>
						)
					})}
				</div>

			</div>
		)
	}
}