import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { GoEye, GoPencil } from 'react-icons/lib/go';
import UpdateModal from './update_bucketlist';
import DeleteModal from './delete_modal';


export default (props) => (
  <div className="bucketlist" key={props.bucketlist.id}>
    <div>
      <h4>{props.bucketlist.name}</h4>
    </div>

    <div className="buttons-div">
      <Link
        to={{pathname:"/bucketlists/"+ props.bucketlist.id + "",
        state:{ name: props.bucketlist.name }
      }}>
        <Button><GoEye /></Button>
      </Link>
      <Button color="primary" onClick={props.toggleUpdateModal.bind(this, props.bucketlist.id)}><GoPencil /></Button>
      <Button color="danger" onClick = {props.toggleDeleteModal.bind(this, props.bucketlist.id)}>X</Button>
    </div>

    <UpdateModal
      showModal={props.showModal}
      id = {props.selectedBucketlist}
      updateTitle={props.updateTitle}
      toggle={props.toggleUpdateModal}
    />

    <DeleteModal
      showDeleteModal={props.showDeleteModal}
      deleteBucketlist={props.deleteBucketlist}
      id={props.selectedBucketlist}
      toggle={props.toggleDeleteModal}
    />
  </div>
)
