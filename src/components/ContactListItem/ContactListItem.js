import React, {useState, useCallback} from "react";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import ButtonSave from "../ButtonSave/ButtonSave";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import "./ContactListItem.scss";
import LocalStorage from "../../LocalStorage";

//change  input value in contact item handler fn
function handlerChangeContactVal(event, setVal) {
    setVal(event.target.value);
}

//edit contact item handler fn
function handlerEditVal(state, setState) {
    setState(!state);
}
//instance LocalStorage Class
const storage = new LocalStorage('data');

//render component
const ContactListItem = (props) => {

    //edit state
    const [readonly, setReadonly] = useState(true);

    //get storage keys object
    const contacts = storage.getStorageKey(props.id);

    // get initial keys from  localStorage
    const [inputVal1, setInputVal1] = useState(contacts.name || '');
    const [inputVal2, setInputVal2] = useState(contacts.email || '');
    const [inputVal3, setInputVal3] = useState(contacts.phone|| '');
    const [inputVal4, setInputVal4] = useState(contacts.website|| '');


    // save changes input value in localStorage
    const handlerSaveVal = useCallback(() => {
        storage.setStorageKey(props.id, inputVal1, inputVal2, inputVal3, inputVal4);
        return [props.id, inputVal1, inputVal2, inputVal3, inputVal4];
    }, [props.id, inputVal1, inputVal2, inputVal3, inputVal4]);

    //cancel changes input value
    const handlerCancelVal = useCallback(() => {
        setInputVal1(contacts.name, contacts.name);
        setInputVal2(contacts.email, contacts.email);
        setInputVal3(contacts.phone, contacts.phone);
        setInputVal4(contacts.website, contacts.website);
        return [contacts.name, contacts.email, contacts.phone, contacts.website];
    }, [contacts.name, contacts.email, contacts.phone, contacts.website]);



    return(
        <tr className='list-item'>
            <th className='align-middle'
                scope="row">
                {props.num}
            </th>
            <td className='align-middle'>
                <img
                    className="list-item__avatar"
                    src={props.avatar}
                    alt={props.name}
                />
            </td>
            <td className='align-middle'>
                {readonly?
                    <span>{inputVal1}</span>
                    :
                    <input
                        onChange={(event)=>{
                        handlerChangeContactVal(event, setInputVal1)
                }}
                        type="text"
                        className='form-control active'
                        defaultValue={inputVal1}
                    />


                }
            </td>
            <td className='align-middle' >
                {readonly?
                    <span>{inputVal2}</span>
                    :
                    <input
                        onChange={(event)=>{
                            handlerChangeContactVal(event, setInputVal2)
                        }}
                        className='form-control active'
                        type="text"
                        defaultValue={inputVal2}
                    />
                }
            </td>
            <td className='align-middle' >
                {readonly?
                    <span>{inputVal3}</span>
                    :
                    <input
                        onChange={(event)=>{
                            handlerChangeContactVal(event, setInputVal3)
                        }}
                        className='form-control active'
                        type="text"
                        defaultValue={inputVal3}
                    />
                }
            </td>
            <td className='align-middle'>
                { readonly?
                    <span>{inputVal4}</span>
                    :
                    <input
                        onChange={(event)=>{
                            handlerChangeContactVal(event, setInputVal4)
                        }}
                        className='form-control active'
                        defaultValue={inputVal4}
                    />
                }
            </td>
            <td className='align-middle'>
                {readonly?
                    <ButtonEdit
                        handlerEventEdit={(event)=> {handlerEditVal(readonly, setReadonly )}}
                    />
                    :
                    <><ButtonSave
                            handlerEventSave={(event)=> {handlerSaveVal(); handlerEditVal(readonly, setReadonly )}}
                        />

                        <ButtonCancel
                            handlerEventEdit={
                                (event)=> {handlerEditVal(readonly, setReadonly ); handlerCancelVal()}}
                        />
                    </>

                }
            </td>
        </tr>
    )
}
export default ContactListItem;
