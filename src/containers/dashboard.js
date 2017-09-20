import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem} from 'reactstrap';
import Header from '../components/dashboard_header';
import UpdateModal from '../components/update_bucketlist';
import AddBucketlist from '../components/add_bucketlist';

const apiUrl = 'http://localhost:5000/bucketlists/'

export default class Dashboard extends Component{
	constructor(props){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateTitle = this.updateTitle.bind(this);
		this.get_bucketlists = this.get_bucketlists.bind(this);
		this.deleteBucketlist = this.deleteBucketlist.bind(this);
		this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
		this.state = {
			bucketlists: [],
			showModal: false,
			redirect: false,
			selectedBucketlist:null
		}
	}

	get_bucketlists(){
		// returns the bucketlists that belong to a user
		axios.get(apiUrl, {
			headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token')}
		}).then((response) => {
			this.setState({
				bucketlists: response.data
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
			this.get_bucketlists()
		}).catch((err) => {
			console.error("return err", err)
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
			this.get_bucketlists()
		}).catch((err) => {
			console.error("return err", err)
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
					bucketlists:[]
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
			this.get_bucketlists()
		}).catch((err) => {
			console.error("return err", err)
		})	
	}

	toggleUpdateModal(id){
		console.log('toggling...')
		console.log('this is id', id)
		this.setState({
			showModal: !this.state.showModal,
			selectedBucketlist: id
		})
	}

	componentDidMount(){
		// get the bucketlists
		this.get_bucketlists()
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
									<ListGroup key={bucketlist.id}>
										<ListGroupItem className="clearfix">
										{bucketlist.name}
											<div className="pull-right">
												<Link to={`/bucketlists/${bucketlist.id}`}><Button>View</Button></Link>
												<Button onClick={toggleUpdateModal.bind(this, bucketlist.id)}>Edit</Button>
												<Button onClick = {deleteBucketlist.bind(this, bucketlist.id)} bsStyle="danger">Delete</Button>
											</div>
											<div>
												<UpdateModal showModal={showModal} id = {selectedBucketlist} updateTitle={updateTitle} toggle={toggleUpdateModal} />
											</div>
											</ListGroupItem>
									</ListGroup>
								)
							})}
						</div>
					</Col>
			</div>
		)
	}
}
