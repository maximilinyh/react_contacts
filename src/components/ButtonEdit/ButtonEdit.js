import React from "react";
import "./ButtonEdit.scss";

const ButtonEdit = (props)=> {
    return(
        <button
            className='btn btn-info'
            onClick={props.handlerEventEdit} >Edit
        </button>
    );
}

export default ButtonEdit;
