import React, { useState, useEffect } from 'react';
import ContactListItem from "../ContactListItem/ContactListItem";
import Search from "../Search/Search";
import "./ContactList.scss";
import { Container } from "react-bootstrap";
import axios from 'axios';
import LocalStorage from "../../LocalStorage";
import {IoMdFunnel} from "react-icons/io";

//instance LocalStorage Class
const storage = new LocalStorage('data');

//sort handler fn
function sortByName(arr) {
    return arr.sort((a, b)=>{
        let nameA= a.name.toLowerCase(),
            nameB= b.name.toLowerCase();
        if (nameA < nameB)
            return -1

        if (nameA > nameB)
            return 1
        return 0
    })
}

//search handler fn
function handlerSearchContact (event, setVal) {
    setVal(event.target.value.trim().toLowerCase());
}
//render ContactList
const  ContactList = () => {

    //search state
    const [searchVal, setSearchVal] = useState('');

    //sort state
    const [sortState, setSortState] = useState(true);

    // data query
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = await axios(
                    'http://demo.sibers.com/users',
                )

                //stringify data to JSON
                storage.setStorage(JSON.stringify(url.data))
            } catch (e) {
                console.error(e);
            }
        };
        return fetchData
        fetchData();
    }, []);


    //storageData array
    const storageData = storage.getStorage();

//default list
    const contactItems = storageData.filter(({name}) => name.toLowerCase().match( searchVal )).map((item) => (
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

//sort list
    const contactItemsSort = sortByName(storageData).filter(({name}) => name.toLowerCase().match( searchVal )).map((item) => (
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
                {/*toolbar*/}
                <div className="contact-toolbar">
                    <Search
                        onSearchHandler={(event)=> {handlerSearchContact(event, setSearchVal)}}
                        defaultValue={searchVal}
                    />
                    <button onClick={()=> {
                        setSortState(!sortState);
                    }} className='contact-toolbar__sort btn btn-outline-light'> <IoMdFunnel/> <span>{!sortState ?
                        'Sort by ID' : 'Sort by first letter'}</span>
                    </button>

                </div>
                {/*table*/}
                <div className='contact-list'>
                        {!sortState ? contactItemsSort : contactItems}
                </div>
            </Container>
    );
}


export default ContactList;
