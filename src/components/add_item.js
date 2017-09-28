import React from 'react';
import {Form, Input, Col, Button} from 'reactstrap';
import { FaPlus } from 'react-icons/lib/fa';
import '../styles/item_dashboard.css';

export default (props) => (
	<Col md={{ size: 4, offset: 4 }}>
		<Form className="add-item-form" onSubmit={props.handleSubmit}>
			<Input type="text" name="item_name" placeholder="Name of the item" required/>
			<Button color="primary" type="submit"><FaPlus /></Button>
		</Form>
	</Col>
)
