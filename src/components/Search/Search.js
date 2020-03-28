import React from 'react';
import "./Search.scss";


const Search = (props)=> {
    return(
        <div className="contact-toolbar__search">
            <input onChange={props.onSearchHandler} className='form-control' type="text" placeholder=' search name' defaultValue={props.defaultValue}/>
        </div>
    );
}

export default Search;
