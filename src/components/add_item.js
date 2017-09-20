import React from 'react';
import {Form} from 'reactstrap';
import '../styles/item_dashboard.css';

export default (props) => (
	<Form className="add-item-form" onSubmit={props.handleSubmit}>
		<input type="text" name="item_name" placeholder="Add name of the item" required/>
		<button type="submit">Add Item</button>
	</Form>
)
