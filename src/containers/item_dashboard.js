import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/dashboard_header';
import AddItemForm from '../components/add_item';
import '../styles/item_dashboard.css';
import AlertContainer from 'react-alert';
import Item from '../components/item';

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
			redirect: false,
			selectedItem: null,
			showModal: false
		}
	}

	alertOptions = {
		offset:14,
		position: 'top right',
		theme: 'light',
		time: 2000,
		transition: 'fade'
	}

	showAlert = (message, status) => {
		if (status === "err"){
			this.msg.show(message, {
				time:2000,
				type:'error'
			})
		}else{
			this.msg.show('Success', {
				time:2000,
				type: 'success'
			})
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
			this.showAlert("success", "success")
			this.get_items()
		}).catch((err) => {
			console.error("return err", err)
			if (err.response){
				this.showAlert(err.response.data.message, "err")
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

	onSearch = event => {
		let q = event.target.value;
		let id = this.props.match.params.id;
		let searchUrl = apiUrl + id + "/items/?q=";
		axios({
			'url':searchUrl + q,
			method:'get',
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
		}).then((response) => {
				this.setState({
					items: response.data.results,
				})
		}).catch((err) => {
			if(err.response){
				const message = "No item with that name"
				this.showAlert(message, "err")
			}
			console.error("return err", err)
		})
	}

	get_items(){
		let id = this.props.match.params.id;
		axios.get(apiUrl + id, {
			headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token')}
		}).then((response) => {
			console.log(response.data.items)
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
			this.showAlert("success", "success")
			this.get_items()
		}).catch((err) => {
			console.error("return err", err)
		})
	}

	componentWillMount(){
		//get the items
		this.get_items()
	}

	render(){
		console.log('this be props', this.props)
		const name = this.props.location.state.name
		const deleteItem = this.deleteItem
		const updateItemName = this.updateItemName
		let {showModal, selectedItem,error, items, redirect } = this.state
		const toggleUpdateModal = this.toggleUpdateModal
		const toggleDeleteModal = this.toggleDeleteModal
		let updateStatus = this.updateStatus
		if (redirect){
			return (<Redirect to="/x" />)
		}

		return(
			<div>
				<Header logout={this.logout} onSearch={this.onSearch}/>

				<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />

				<h2 className="bucket-name">{ name }</h2>
				<AddItemForm handleSubmit={this.handleSubmit} />

				<h4 className="text-center">Items</h4>

				<div className="list-items">
					{items.sort(
							(a, b) => Number(a.id) - Number(b.id)).map(function(item){
						return(
							<Item
								key={item.id}
								item={item}
								toggleUpdateModal={toggleUpdateModal}
								toggleDeleteModal={toggleDeleteModal}
								deleteItem={deleteItem}
								selectedItem={selectedItem}
								showModal={showModal}
								updateItemName={updateItemName}
								updateStatus={updateStatus}
							/>
						)
					})}
				</div>
			</div>
		)
	}
}
