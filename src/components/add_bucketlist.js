import React from 'react'
import {Form, Button, Input, Col} from 'reactstrap'
import '../styles/dashboard.css'

const AddBucket = props => (
	<Col md={{ size: 4, offset: 4 }}>
		<Form className="add-bucketlist-form" onSubmit={(event) => props.handleSubmit(event)}>
			<Input type="text" name = "name" placeholder="Add name of bucketlist" required />
			<Button color="primary "type="submit">Create</Button>
		</Form>
	</Col>
);

export default AddBucket;
