import React, {useState, useCallback } from "react";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import ButtonSave from "../ButtonSave/ButtonSave";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import "./ContactListItem.scss";



//change  input value in contact item handler fn
function handlerChangeContactVal(event, setVal) {
    setVal(event.target.value);
}

//edit  contact item handler fn
function handlerEditVal(state, setState) {
    setState(!state);
    console.log(state)
}



//render component
const ContactListItem = (props) => {

    //readonly input initial  state
    const [readonly, setReadonly] = useState(true);

    // get input value initial state in localStorage

    // const [inputVal1, setInputVal1] = useState(localStorage.getItem(props.name));
    // const [inputVal2, setInputVal2] = useState(localStorage.getItem(props.email));
    // const [inputVal3, setInputVal3] = useState(localStorage.getItem(props.phone));
    // const [inputVal4, setInputVal4] = useState(localStorage.getItem(props.website));

    const [inputVal1, setInputVal1] = useState(props.name);
    const [inputVal2, setInputVal2] = useState(props.email);
    const [inputVal3, setInputVal3] = useState(props.phone);
    const [inputVal4, setInputVal4] = useState(props.website);


    // save change input value in localStorage
    const handlerSaveVal = useCallback(() => {
        localStorage.setItem(props.name, inputVal1);
        localStorage.setItem(props.email, inputVal2);
        localStorage.setItem(props.phone, inputVal3);
        localStorage.setItem(props.website, inputVal4);
        return [inputVal1, inputVal2, inputVal3, inputVal4];
    }, [props.name, props.email, props.phone, props.website, inputVal1, inputVal2, inputVal3, inputVal4]);



    //cancel change input value
    const handlerCancelVal = useCallback(() => {
        setInputVal1(inputVal1, inputVal1);
        setInputVal2(inputVal2, inputVal2);
        setInputVal3(inputVal3, inputVal3);
        setInputVal4(inputVal4, inputVal4);
        return [props.name, props.email, props.phone, props.website, ];
    }, [props.name, props.email, props.phone, props.website]);



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
                        defaultValue={!inputVal1? inputVal1:inputVal1 }
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
                        defaultValue={!inputVal2? inputVal2:inputVal2 }
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
                        defaultValue={!inputVal3? inputVal3:inputVal3 }
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
                        defaultValue={!inputVal4? inputVal4:inputVal4 }
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
                            handlerEventEdit={(event)=> {handlerCancelVal(); handlerEditVal(readonly, setReadonly )}}
                        />
                    </>

                }
            </td>
        </tr>
    )
}
export default ContactListItem;
