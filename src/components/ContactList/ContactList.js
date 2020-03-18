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
    const [data, setData] = useState([]);

    //hook search value
    const [searchVal, setSearchVal] = useState('');

    // useEffect hook
    useEffect(() => {
        // data query
        const fetchData = async () => {
            try {
                const url = await axios(
                    'http://demo.sibers.com/users',
                );
                setData(url.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);


    // contact items render cycle with filter by name
    const contactItems = data.filter(({name}) => name.toLowerCase().match( searchVal )).map((item, index) => (
        <ContactListItem
            key={index}
            num = {index + 1}
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
