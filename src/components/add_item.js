import React from 'react';
import {Form, Input, Col, Button} from 'reactstrap';
import '../styles/item_dashboard.css';

export default (props) => (
	<Col md={{ size: 4, offset: 4 }}>
		<Form className="add-item-form" onSubmit={props.handleSubmit}>
			<Input type="text" name="item_name" placeholder="Name of the item" required/>
			<Button color="primary" type="submit">Add Item</Button>
		</Form>
	</Col>
)
