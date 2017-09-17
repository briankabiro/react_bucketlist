import React from 'react';
import { Modal, Button, FormGroup, FormControl, Form, Col, ControlLabel } from 'react-bootstrap';

export default (props) => (
	<Modal show={props.showModal} onHide={props.toggle}>
        <Modal.Header closeButton>
            <Modal.Title>Update Bucketlist Name</Modal.Title>
        </Modal.Header>

        <Modal.Body>
			<Form horizontal onSubmit={(event) => props.updateTitle(event, props.id)}>
				<FormGroup controlId="formHorizontalUsername">
					<Col componentClass={ControlLabel} sm={2}>
					 	Name
					</Col>
				  	<Col sm={10}>
				    	<FormControl type="text" name = "name" placeholder="Add new name" required/>
					</Col>
				</FormGroup>
				
			    <FormGroup>
			    	<Col smOffset={2} sm={10}>
				        <Button type="submit">
				          Update
				    	</Button>
			    	</Col>
			    </FormGroup>
			</Form>
        </Modal.Body>
        
        <Modal.Footer>
            <Button onClick={props.toggle}>Close</Button>
        </Modal.Footer>
        
    </Modal>
)