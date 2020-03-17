import React from "react";
import "./ButtonSave.scss";

const ButtonSave = (props)=> {
    return(
        <button
            className='btn btn-success'
            onClick={props.handlerEventSave} >Save
        </button>
    );
}

export default ButtonSave;
