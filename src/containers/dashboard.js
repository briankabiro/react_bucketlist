import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { GoEye, GoPencil } from 'react-icons/lib/go';
import Header from '../components/dashboard_header';
import UpdateModal from '../components/update_bucketlist';
import AddBucketlist from '../components/add_bucketlist';
import Pagination from '../components/pagination';

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
			redirect: false,
			selectedBucketlist:null,
			searchMessage:null,
			pages:null,
			currentPage:1
		}
	}

	get_bucketlists(page){
		// returns the bucketlists that belong to a user
		 console.log(this.state.currentPage)
		axios.get(getApiUrl+page, {
			headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token')}
		}).then((response) => {
			this.setState({
				bucketlists: response.data.results,
				searchMessage:null,
				pages: response.data.pages
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

	deleteBucketlist(id){
		axios({
			'url':apiUrl + id,
			method:'delete',
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
		}).then(() => {
			this.get_bucketlists(1)
		}).catch((err) => {
			console.error("return err", err)
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
		}).then(() => {
			this.get_bucketlists(this.state.currentPage)
		}).catch((err) => {
			console.error("return err", err)
		})
	}

	handlePagination(i){
		this.get_bucketlists(i)
		this.setState({
			currentPage:i
		})
	}

	onSearch(event){
		event.preventDefault();
		let data = new FormData(event.target);
		let q = data.get('search');
		let searchUrl = apiUrl + "?q=";

		axios({
			'url':searchUrl + q,
			method:'get',
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
		}).then((response) => {
				this.setState({
					bucketlists: response.data,
					searchMessage:null
				})
		}).catch((err) => {
			if (err.response){
				this.setState({
					searchMessage:"You don't have a bucketlist with that name",
				})
			}
			console.error("return err", err)
		})
	}

	updateTitle(event, id){
		console.log("updating...")
		console.log('id', id)
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
			this.toggleUpdateModal()
			this.get_bucketlists(this.state.currentPage)
		}).catch((err) => {
			console.error("return err", err)
		})
	}

	toggleUpdateModal(id){
		this.setState({
			showModal: !this.state.showModal,
			selectedBucketlist: id
		})
	}

	componentWillMount(){
		// get the bucketlists
		this.get_bucketlists(this.state.currentPage)
	}

	render(){
		let bucketlists = this.state.bucketlists
		let deleteBucketlist = this.deleteBucketlist
		let toggleUpdateModal = this.toggleUpdateModal
		let {showModal} = this.state
		let updateTitle = this.updateTitle
		let selectedBucketlist = this.state.selectedBucketlist
		
		if (this.state.redirect){
			return (<Redirect to="/login" />)
		}
		
		console.log(bucketlists)
		return(
			<div>
				<Header />
				<AddBucketlist handleSubmit={this.handleSubmit}/>
				
				<h3 className="text-center">Your Bucketlists</h3>
					<Col md={6} mdPush={3}>
						<div>
							{bucketlists.map(function(bucketlist){
								return(
									<div className="bucketlist" key={bucketlist.id}>
										<div>
											<h3>{bucketlist.name}</h3>
										</div>

										<div className="buttons-div">
											<Link to={`/bucketlists/${bucketlist.id}`}><Button color="success"><GoEye /></Button></Link>
											<Button onClick={toggleUpdateModal.bind(this, bucketlist.id)}><GoPencil /></Button>
											<Button color="danger" onClick = {deleteBucketlist.bind(this, bucketlist.id)}>X</Button>
										</div>
										<UpdateModal showModal={showModal} id = {selectedBucketlist} updateTitle={updateTitle} toggle={toggleUpdateModal} />
							</div>
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
