import React from 'react';

function Checkbox(props){
  if (props.done){
    return (
      <input type="checkbox" checked={props.done} onChange={props.updateStatus}/>
    );
  }else{
    return (
      <input type="checkbox" checked={props.done} onChange={props.updateStatus} />
    );
  }
}
export default Checkbox
