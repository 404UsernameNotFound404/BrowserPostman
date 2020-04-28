import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import JSONSingleLineInput from './JSONSingleLineInput';

const Component = styled.div`
    width: 90%;
    margin: 0 2.5%;
    border: thin solid grey;
    padding-left: 0.1em;
    color: white;
    font-size: 1.5rem;
`;

const Content = styled.div`
    margin-left: 1em;
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
`;

type Props = {
    data: object,
    edit: Function,
    addNewProperty: Function,
    deleteProperty: Function
}

function JSONInput(props: Props) {

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
    
    return (
        <Component>
            {"{"}
            <Content>
                {
                    Object.entries(props.data).map(ele => <JSONSingleLineInput deleteProperty = {props.deleteProperty} edit={findChange} objKey={ele[0]} value={ele[1]} />)
                }
                <AddProperty onClick = {() => {props.addNewProperty()}} color = {"green"}>+</AddProperty>
            </Content>
            {"}"}
        </Component>
    )
}

export default JSONInput;