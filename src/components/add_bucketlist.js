import React from 'react'
import {Col, Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

export default (props) => (
	<Form onSubmit={(event) => props.handleSubmit(event)}>
		<FormGroup controlId="formHorizontalUsername">
			<Col sm={5} smPush={3}>
		    	<FormControl type="text" name = "name" placeholder="Add name of bucketlist" required/>
				<Button type="submit">Create</Button>
			</Col>
		</FormGroup>
		
	    <FormGroup>
	    	<Col smPush={5}>
		        <Button type="submit">
		          Create
		    	</Button>
	    	</Col>
	    </FormGroup>
	</Form>

)