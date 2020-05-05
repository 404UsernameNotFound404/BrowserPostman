import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import JSONSingleLineInput from './JSONSingleLineInput';

const Component = styled.div`
    width: 90%;
    margin: 0 2.5%;
    color: white;
    font-size: 1.5rem;
`;

const Content = styled.div`
    border: thin solid grey;
    /* margin-left: 1em; */
`;

const AddProperty = styled.h4`
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    background-color: ${p => p.color};
    color: white;
    line-height: 1.5rem;
    text-align: center;
    font-size: 1.4em;
    margin: 0.2em 0;
    margin-left: 0.7em;
`;

const UpdateButton = styled.div`
    border-radius: 0.5em;
    background-color: green;
    width: 5rem;
    margin-top: 0.5em;
    text-align: center;
    padding: 0.1em;
    cursor: pointer;
    &:hover {
        background-color: darkgreen;
    }
`;

type Props = {
    data: object,
    edit: Function,
    addNewProperty: Function,
    deleteProperty: Function
}

function JSONInput(props: Props) {
    const [tempData, setTempData] = useState([] as any);

    useEffect(() => {
        if (props.data != tempData) {
            console.log("update without need")
            setTempData(props.data);
        }
    }, [props.data])

    const findChange = (isBodyChange: boolean, newValue: string, oldKey: string) => {
        let oldObj = { ...props.data } as any;
        let objValue = oldObj[oldKey];
        if (!isBodyChange) {
            delete oldObj[oldKey];
            oldObj[newValue] = objValue;
        } else {
            if (newValue == "true" || newValue == "false") {
                oldObj[oldKey] = newValue == "true" ? true : false;
            } else {
                oldObj[oldKey] = newValue;
            }
        }
        props.edit(oldObj);
    }

    const editKey = (id: number, value: string) => {
        let newObject = {} as any;
        Object.entries(tempData).map((ele, i) => {
            if (i == id) {
                newObject[value] = ele[1];
            }else {
                newObject[ele[0]] = ele[1];
            }
        })
        setTempData(newObject);
        props.edit(newObject);
    }

    const editValue = (id: number, value: string) => {
        let newObject = {} as any;
        Object.entries(tempData).map((ele, i) => {
            if (i == id) {
                newObject[ele[0]] = value;
            }else {
                newObject[ele[0]] = ele[1];
            }
        })
        setTempData(newObject);
        props.edit(newObject);
    }

    const deleteProperty = (key: string) => {
        let newObject = {} as any;
        Object.entries(tempData).map((ele, i) => {
            if (ele[0] != key) {
                newObject[ele[0]] = ele[1];
            }
        })
        setTempData(newObject);
        props.deleteProperty(key);
    }

    const addNewProperty = () => {
        let newKey = "key";
        while (tempData[newKey] != undefined) {
            newKey = "key" + Math.floor(Math.random() * 100);
        }
        tempData[newKey] = '"value"';
        props.addNewProperty();
    }

    return (
        <Component>
            <Content>
                {"{"}
                {
                    Object.entries(tempData).map((ele, i) => <JSONSingleLineInput id = {i} editKey = {editKey} editValue = {editValue} deleteProperty={deleteProperty} objKey={ele[0]} value={ele[1]} key = {i} />)
                }
                <AddProperty onClick={addNewProperty} color={"green"}>+</AddProperty>
                {"}"}
            </Content>
        </Component>
    )
}

export default JSONInput;