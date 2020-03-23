import React, { useState, useEffect } from 'react';
import ContactListItem from "../ContactListItem/ContactListItem";
import Search from "../Search/Search";
import "./ContactList.scss";
import { Container } from "react-bootstrap";
import axios from 'axios';


//search handler fn
function handlerSearchContact (event, setVal) {
    setVal(event.target.value.trim().toLowerCase());
}

const  ContactList = () => {
    //hook fetch data
    // const [data, setData] = useState([]);

    //hook search value
    const [searchVal, setSearchVal] = useState('');

    // data query
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = await axios(
                    'http://demo.sibers.com/users',
                )
                // setData(url.data);
                //stringify data to JSON
                localStorage.setItem('data', JSON.stringify(url.data));
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    // parse JSON data
    let resultDataObj = [];

    try {
        resultDataObj = JSON.parse(localStorage.getItem('data')|| [])
    }
    catch (e) {
        console.error(e);
    }


    let obj ={ ...resultDataObj};



    // contact items render cycle with filter by name
    const contactItems = resultDataObj.filter(({name}) => name.toLowerCase().match( searchVal )).map((item) => (
        <ContactListItem
            id={item.id}
            key={item.id}
            num = {item.id + 1}
            avatar = {item.avatar}
            name={item.name}
            email={item.email}
            phone={item.phone}
            website={`www.${item.website}`}>
        </ContactListItem>
    ))

    //render component
    return (
            <Container>
                <Search
                    onSearchHandler={(event)=> {handlerSearchContact(event, setSearchVal)}}
                    defaultValue={searchVal}
                />
                <button onClick={()=>{localStorage.clear()}}>Clear</button>
                <button onClick={()=>{
                    var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
                }}>Check space</button>
                <div className='ContactList table-responsive '>
                    <table className="table table-striped">
                        <thead className='thead-dark'>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Website</th>
                            <th scope="col">Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchVal.length > 0 ? contactItems: contactItems}
                        </tbody>
                    </table>
                </div>
            </Container>
    );
}


export default ContactList;
