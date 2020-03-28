import React, { useState, useEffect } from 'react';
import ContactListItem from "../ContactListItem/ContactListItem";
import Search from "../Search/Search";
import "./ContactList.scss";
import { Container } from "react-bootstrap";
import axios from 'axios';
import LocalStorage from "../../LocalStorage";


const storage = new LocalStorage('data');
console.log(localStorage)

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

const  ContactList = () => {
    //hook search value
    const [searchVal, setSearchVal] = useState('');

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

//storageData
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
                <div className="contact-toolbar">
                    <Search
                        onSearchHandler={(event)=> {handlerSearchContact(event, setSearchVal)}}
                        defaultValue={searchVal}
                    />
                    <button onClick={()=> {
                        setSortState(!sortState);
                    }} className='contact-toolbar__sort btn btn-info'>  {!sortState ?
                        'Sort by number' : 'Sort by first letter'}
                    </button>

                </div>

                <div className='contact-list table-responsive '>
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
                        {!sortState ? contactItemsSort : contactItems}
                        </tbody>
                    </table>
                </div>
            </Container>
    );
}


export default ContactList;
