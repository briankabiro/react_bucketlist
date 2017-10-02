import React from 'react';
import '../styles/checkbox.css';

function Checkbox(props){
  if (props.done){
    return (
      <input type="checkbox" id = "checkbox" checked={props.done} onChange={props.updateStatus}/>
    );
  }else{
    return (
      <input type="checkbox" id = "checkbox" checked={props.done} onChange={props.updateStatus} />
    );
  }
}
export default Checkbox
