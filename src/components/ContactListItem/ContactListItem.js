import React, {useState, useCallback } from "react";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import ButtonSave from "../ButtonSave/ButtonSave";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import "./ContactListItem.scss";


//change readonly input state in contact item  handler fn
function handlerEditVal(event, state, setState) {
    setState(!state)
}

//change  input value in contact item handler fn
function handlerChangeContactVal(event, setVal) {
    setVal(event.target.value);
}


//render component
const ContactListItem = (props) => {

    //readonly input initial  state
    const [readonly, setReadonly] = useState(true);

    // input value initial state with localStorage
    const [inputVal1, setInputVal1] = useState(localStorage.getItem(props.name));
    const [inputVal2, setInputVal2] = useState(localStorage.getItem(props.email));
    const [inputVal3, setInputVal3] = useState(localStorage.getItem(props.phone));
    const [inputVal4, setInputVal4] = useState(localStorage.getItem(props.website));


    //save change input value in localStorage
    const handlerSaveVal = useCallback(() => {
        localStorage.setItem(props.name, inputVal1);
        localStorage.setItem(props.email, inputVal2);
        localStorage.setItem(props.phone, inputVal3);
        localStorage.setItem(props.website, inputVal4);

        return [inputVal1, inputVal2, inputVal3, inputVal4];
    }, [props.name, props.email, props.phone, props.website, inputVal1, inputVal2, inputVal3, inputVal4]);

    //cancel change input value
    const handlerCancelVal = useCallback(() => {
        setInputVal1( inputVal1, inputVal1);
        setInputVal2(inputVal2, inputVal2);
        setInputVal3(inputVal3, inputVal3);
        setInputVal4(inputVal4, inputVal4);
        return [props.name, props.email, props.phone, props.website];
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
                <input
                    onChange={(event)=>{
                        handlerChangeContactVal(event, setInputVal1)
                    }}
                    type="text"
                    className={readonly? 'form-control': 'form-control active'}
                    defaultValue={!inputVal1? inputVal1:inputVal1 }
                    readOnly={readonly}
                />
            </td>
            <td className='align-middle' >
                <input
                    onChange={(event)=>{
                        handlerChangeContactVal(event, setInputVal2)
                    }}
                    className={readonly? 'form-control': 'form-control active'}
                    type="text"
                    defaultValue={!inputVal2? inputVal2:inputVal2 }
                    readOnly={readonly}
                />
            </td>
            <td className='align-middle' >
                <input
                    onChange={(event)=>{
                        handlerChangeContactVal(event, setInputVal3)
                    }}
                     className={readonly? 'form-control': 'form-control active'}
                     type="text"
                     defaultValue={!inputVal3? inputVal3:inputVal3 }
                     readOnly={readonly}
                />
            </td>
            <td className='align-middle'>
                <input
                    onChange={(event)=>{
                        handlerChangeContactVal(event, setInputVal4)
                    }}
                    className={readonly? 'form-control': 'form-control active'}
                    defaultValue={!inputVal4? inputVal4:inputVal4 }
                    readOnly={readonly}
                />
            </td>
            <td className='align-middle'>
                {readonly?

                    <ButtonEdit
                        handlerEventEdit={(event)=>{handlerEditVal(event, readonly, setReadonly)}}
                    />:
                    <>
                    <ButtonSave
                        handlerEventSave={(event)=>{handlerEditVal(event, readonly, setReadonly); handlerSaveVal()}}
                    />
                    <ButtonCancel
                        handlerEventEdit={(event)=>{handlerEditVal(event, readonly, setReadonly); handlerCancelVal()}}
                    />
                    </>

                }
            </td>
        </tr>
    )
}
export default ContactListItem;
