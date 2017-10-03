import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import Header from '../components/dashboard_header';
import AddBucketlist from '../components/add_bucketlist';
import Pagination from '../components/pagination';
import AlertContainer from 'react-alert';
import Bucketlist from '../components/bucketlist';

const getApiUrl = 'http://localhost:5000/bucketlists/?page=';
const apiUrl = 'http://localhost:5000/bucketlists/';

export default class Dashboard extends Component{
	constructor(props){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateTitle = this.updateTitle.bind(this);
		this.get_bucketlists = this.get_bucketlists.bind(this);
		this.deleteBucketlist = this.deleteBucketlist.bind(this);
		this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.handlePagination = this.handlePagination.bind(this);
		this.logout = this.logout.bind(this);
		this.state = {
			bucketlists: [],
			showModal: false,
			showDeleteModal:false,
			redirect: false,
			selectedBucketlist:null,
			searchMessage:null,
			pages:null,
			currentPage:1,
			visible: false
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

	get_bucketlists(page){
		// returns the bucketlists that belong to a user
		axios.get(getApiUrl+page, {
			headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token')}
		}).then((response) => {
			this.setState({
				bucketlists: response.data.results,
				pages: response.data.pages
			})
		}).catch((err) => {
			if (err.response){
				this.setState({
					redirect: true
				})
			}
		})
	}

	deleteBucketlist(event){
		event.preventDefault()
		console.log('deleting...')
		let id = event.target.id
		axios({
			'url':apiUrl + id,
			method:'delete',
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
		}).then(() => {
			this.toggleDeleteModal()
			this.showAlert("success", "success")
			this.get_bucketlists(1)
		}).catch((err) => {
		})
	}

	logout(){
		localStorage.removeItem('token')
		this.setState({
			redirect: true
		})
	}

	handleSubmit(event){
		// event handler when the form is submitted
		event.preventDefault();
		let data = new FormData(event.target);
		let name = data.get('name');

		axios({
			'url':apiUrl,
			method:'post',
			data: {
				name: name
			},
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
		}).then((response) => {
			this.get_bucketlists(this.state.currentPage)
			this.showAlert("success", "success")
		}).catch((err) => {
			this.showAlert(err.response.data.message, "err")
			if (err.response && err.response.status === 400) {
				this.setState({
					error: err.response.data.message,
					visible: true
				})
			}
		})
	}

	handlePagination(i){
		this.get_bucketlists(i)
		this.setState({
			currentPage:i
		})
	}

	onSearch(event){
		let q = event.target.value;
		let searchUrl = apiUrl + "?q=";
		axios({
			'url':searchUrl + q,
			method:'get',
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
		}).then((response) => {
				this.setState({
					bucketlists: response.data.results,
				})
		}).catch((err) => {
			if (err.response){
				this.setState({
					bucketlists: []
				})
			}
		})
	}

	updateTitle(event, id){
		event.preventDefault();
		let data = new FormData(event.target);
		let new_name = data.get('name');
		axios({
			'url':'http://localhost:5000/bucketlists/'+id,
			method:'put',
			data: {
				name: new_name
			},
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
		}).then(() => {
			this.toggleUpdateModal();
			this.showAlert("success", "success")
			this.get_bucketlists(this.state.currentPage);
		}).catch((err) => {
		})
	}

	toggleDeleteModal = (id) => {
		this.setState({
			showDeleteModal: !this.state.showDeleteModal,
			selectedBucketlist: id
		})
	}

	toggleUpdateModal(id){
		this.setState({
			showModal: !this.state.showModal,
			selectedBucketlist: id
		})
	}

	componentWillMount() {
		// get the bucketlists
		this.get_bucketlists(this.state.currentPage)
	}

	render(){
		let deleteBucketlist = this.deleteBucketlist
		let toggleUpdateModal = this.toggleUpdateModal
		let updateTitle = this.updateTitle
		let toggleDeleteModal = this.toggleDeleteModal
		let { showDeleteModal, selectedBucketlist, bucketlists, showModal} = this.state
		if (this.state.redirect){
			return (<Redirect to="/login" />)
		}
		return(
			<div>
				<Header onSearch={this.onSearch} logout={this.logout} />
				<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />

				{/* add bucket list form */}
				<AddBucketlist handleSubmit={this.handleSubmit} />

				<h3 className="text-center">Your Bucketlists</h3>
					<p className="text-center">{this.state.searchMessage}</p>
						<div className="bucketlists">
							{bucketlists.sort(
									(a, b) => Number(a.id) - Number(b.id)).map(function(bucketlist, index){
								return(
									<Bucketlist
										key={bucketlist.id}
										bucketlist={bucketlist}
										toggleUpdateModal={toggleUpdateModal}
										toggleDeleteModal={toggleDeleteModal}
										deleteBucketlist={deleteBucketlist}
										selectedBucketlist = {selectedBucketlist}
										updateTitle={updateTitle}
										showModal={showModal}
										showDeleteModal={showDeleteModal}
										/>
								)
							})}
						</div>
					<Row>
						<Col md={{ size: 3, offset: 6}}>
							<Pagination onClick={this.handlePagination} pages={this.state.pages} />
						</Col>
					</Row>
			</div>
		)
	}
}
