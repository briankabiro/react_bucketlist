import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from 'reactstrap';

export default (props) => (
	<Modal isOpen={props.showModal}>
				<ModalHeader>
            Update Item Name
        </ModalHeader>

        <ModalBody>
					<Form onSubmit={(event) => props.updateItemName(event, props.id)}>
						<FormGroup>
							<Label for="title">Name</Label>
							<Input type="text" name = "name" placeholder="Add new name" required id="title" />
						</FormGroup>
						<Button>Update</Button>
					</Form>
				</ModalBody>

        <ModalFooter>
            <Button color="secondary" onClick={props.toggle}>Close</Button>
        </ModalFooter>
    </Modal>
)
