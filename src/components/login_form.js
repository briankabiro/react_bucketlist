import React from 'react'
import {FormControl, FormGroup, Col, ControlLabel, Form, Button} from 'react-bootstrap'

export default (props) => (
	<Form horizontal onSubmit={props.handleSubmit}>

		<FormGroup controlId="formHorizontalUsername">
			<Col componentClass={ControlLabel} sm={2}>
				Username
			</Col>
			<Col sm={10}>
				<FormControl type="text" name = "username" placeholder="Username" required/>
			</Col>
		</FormGroup>
		
		<FormGroup controlId="formHorizontalPassword">
			<Col componentClass={ControlLabel} sm={2}>
				Password
			</Col>
			<Col sm={10}>
				<FormControl type="password" name="password" placeholder="Password" required/>
			</Col>
		</FormGroup>
		
		<FormGroup>
			<Col smOffset={2} sm={10}>
				<Button type="submit">
				  Login
				</Button>
			</Col>
		</FormGroup>
	</Form>
)