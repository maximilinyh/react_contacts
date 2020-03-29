import React, {useState, useCallback} from "react";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import ButtonSave from "../ButtonSave/ButtonSave";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import "./ContactListItem.scss";
import LocalStorage from "../../LocalStorage";
import NoPhotoImage from "../../assets/img/nophoto.jpg";



//change  input value in contact item handler fn
function handlerChangeContactVal(event, setVal) {
    setVal(event.target.value);
}

//edit contact item handler fn
function handlerEditVal(state, setState) {
    setState(!state);
}


//error 403 default image handler fn
function handleImgError(event, src) {
    event.target.src= src;
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
        <div className='list-item'>
            <div className="list-item__head">
                <div className='list-item__id'>
                    <span className='list-item__title'>Id</span>
                    <span className='list-item__value'>{props.num}</span>
                </div>

                <div className='list-item__image'>
                <span className='list-item__value'>
                    <img
                        className="list-item__avatar"
                        src={props.avatar}
                        alt={props.name}
                        onError={(event)=> {
                            handleImgError(event, NoPhotoImage)
                        }}
                    />
                </span>
                </div>

                <div className='list-item__name'>
                    <span className='list-item__value'>
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
                </span>
                </div>
            </div>


            <div className="list-item__content">
                <div className='list-item__row'>
                    <span className='list-item__title'>Email:</span>
                    <span className='list-item__value'>
                    {readonly?
                        <span>{inputVal2}</span>
                        :
                        <input
                            onChange={(event)=>{
                                handlerChangeContactVal(event, setInputVal2)
                            }}
                            type="text"
                            className='form-control active'
                            defaultValue={inputVal2}
                        />
                    }
                </span>
                </div>


                <div className='list-item__row'>
                    <span className='list-item__title'>Phone:</span>
                    <span className='list-item__value'>
                    {readonly?
                        <span>{inputVal3}</span>
                        :
                        <input
                            onChange={(event)=>{
                                handlerChangeContactVal(event, setInputVal4)
                            }}
                            type="text"
                            className='form-control active'
                            defaultValue={inputVal3}
                        />
                    }
                </span>
                </div>

                <div className='list-item__row'>
                    <span className='list-item__title'>Website:</span>
                    <span className='list-item__value'>
                    {readonly?
                        <span>{inputVal4}</span>
                        :
                        <input
                            onChange={(event)=>{
                                handlerChangeContactVal(event, setInputVal4)
                            }}
                            type="text"
                            className='form-control active'
                            defaultValue={inputVal4}
                        />
                    }
                </span>
                </div>
            </div>

            <div className='list-item__edit'>
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
            </div>
        </div>
    )
}
export default ContactListItem;
