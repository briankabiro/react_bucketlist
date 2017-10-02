import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export default (props) => (
	<Modal isOpen={props.showDeleteModal}>
				<ModalHeader>
            Delete Bucketlist
        </ModalHeader>

        <ModalBody>
          <p>Are you sure you want to delete this bucketlist?</p>
          <Button onClick = {props.deleteBucketlist()} id = {props.id} color="danger">Yes</Button>
				</ModalBody>

        <ModalFooter>
            <Button color="secondary" onClick={props.toggle}>Close</Button>
        </ModalFooter>
    </Modal>
)
