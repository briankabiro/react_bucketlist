import React from 'react'
import {Form, Button} from 'reactstrap'
import '../styles/dashboard.css'

const AddBucket = props => (
	<Form className="add-bucketlist-form" onSubmit={(event) => props.handleSubmit(event)}>
    <input id="input" type="text" name = "name" placeholder="Add name of bucketlist" required />
		<input type="text" name = "name" placeholder="Add name of bucketlist" required />
		<Button color="primary "type="submit">Create</Button>
	</Form>
);

export default AddBucket;
