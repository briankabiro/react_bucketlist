import React from 'react';
import { Button } from 'reactstrap';
import { GoPencil } from 'react-icons/lib/go';
import Checkbox from './checkbox';
import UpdateItem from './update_item';

export default (props) => (
  <div className={props.item.done ? 'item-active': 'item'}>
    <div className="item-left">
      <Checkbox
        done={props.item.done}
        updateStatus={props.updateStatus.bind(this, props.item.id, props.item.done)}
      />
      <span>{props.item.description}</span>
    </div>

    <div className="item-right">
      <Button onClick={props.toggleUpdateModal.bind(this, props.item.id)}><GoPencil /></Button>
      <Button color="danger" onClick = {props.deleteItem.bind(this, props.item.id)}>X</Button>
      <UpdateItem
        showModal={props.showModal}
        id = {props.selectedItem}
        updateItemName={props.updateItemName}
        toggle={props.toggleUpdateModal}
      />
    </div>
  </div>
)
