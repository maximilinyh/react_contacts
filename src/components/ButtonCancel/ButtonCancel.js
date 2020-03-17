import React from "react";
import "./ButtonCancel.scss";

const ButtonCancel = (props)=> {
    return(
        <button
            className='btn btn-info mt-1'
            onClick={props.handlerEventEdit} >Cancel
        </button>
    );
}

export default ButtonCancel;
