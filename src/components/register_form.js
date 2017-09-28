import React from 'react';
import {FormGroup, Input, Label, Form, Button} from 'reactstrap';

export default (props) => (
	<Form onSubmit={props.handleSubmit}>
		<FormGroup>
			<Label for="username">Username</Label>
			<Input type="text" name = "username" placeholder="Username" required id="username" />
		</FormGroup>

		<FormGroup>
			<Label for="password">Password</Label>
			<Input type="password" name="password" placeholder="Password" required id="password" />
		</FormGroup>
		
		<Button color="primary">Register</Button>
	</Form>
)
