import React, {Component} from 'react';
import Header from '../components/header';

export default class ItemDashboard extends Component{
	
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