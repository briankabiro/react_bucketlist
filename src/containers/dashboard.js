import React, {Component} from 'react'
import Header from '../components/header'

export default class Dashboard extends Component{
	constructor(props){
		super(props)

	}
	render(){
		<div>
			<Header />
			<form>
				<input type="text" placeholder="Add name of the bucketlist"/>
				<button type="submit">Create</button>
			</form>
			<h3>Your Bucketlists</h3>
		</div>
	}
}