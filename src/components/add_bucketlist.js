import React from 'react'
import {Form} from 'react-bootstrap'
import '../styles/dashboard.css'

export default (props) => (
	<Form className="add-bucketlist-form" onSubmit={(event) => props.handleSubmit(event)}>
    	<input type="text" name = "name" placeholder="Add name of bucketlist" required/>
		<button type="submit">Create</button>
	</Form>

)