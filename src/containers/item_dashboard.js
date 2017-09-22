import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';
import { GoPencil } from 'react-icons/lib/go';
import Header from '../components/dashboard_header';
import UpdateItem from '../components/update_item';
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
		this.updateStatus = this.updateStatus.bind(this);
		this.logout = this.logout.bind(this);

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
			if (err.response){
				this.setState({
					redirect: true
				})
			}
		})
	}

	logout(){
		localStorage.removeItem('token')
		this.setState({
			redirect: true
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
		let updateItemName = this.updateItemName
		let {showModal} = this.state
		let selectedItem = this.state.selectedItem
		const toggleUpdateModal = this.toggleUpdateModal
		if (redirect){
			return (<Redirect to="/login" />)
		}
		return(
			<div>
				<Header logout={this.logout} />
				<AddItemForm handleSubmit={this.handleSubmit} />
				<p>{ error }</p>
				<h3>Items</h3>
				<div>
					{items.map(function(item){
						return(
								<div className="item" key={item.id}>
									<div className="item-left">
										<Checkbox done={item.done} updateStatus={updateStatus.bind(this, item.id, item.done)} />
										<span>{item.description}</span>
									</div>

									<div className="item-right">
										<Button onClick={toggleUpdateModal.bind(this, item.id)}><GoPencil /></Button>
										<Button color="danger" onClick = {deleteItem.bind(this, item.id)}>X</Button>
										<UpdateItem showModal={showModal} id = {selectedItem} updateItemName={updateItemName} toggle={toggleUpdateModal} />
									</div>
								</div>
						)
					})}
				</div>
			</div>
		)
	}
}