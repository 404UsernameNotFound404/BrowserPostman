import React, { useContext } from 'react';
import styled from 'styled-components';
import JSONInput from '../../Library/JSONInput/JSONInput';
import { AppContext } from '../../../Context/AppContext';

const Component = styled.div`
    width: 100%;
    margin: 0 2.5%;
`;

const Title = styled.h2`
    color:  white;
    font-size: 1.75em;
`;

type Props = {
    isBodyInput: boolean,
    value: object,
    updateBodyOrHeaders: Function,
    addNewProperty: Function,
    deleteProperty: Function
}

function BodyOrHeaderInput(props: Props) {
    const c = useContext(AppContext);
    const {isBodyInput, value} = props;

    const editBody = (newValue: any) => {
        // console.log(newValue);
        props.updateBodyOrHeaders(isBodyInput, newValue);
    }

    const addNewProperty = () => {
        props.addNewProperty(props.isBodyInput);
    }

    const deleteProperty = (keyToDel: string) => {
        props.deleteProperty(isBodyInput, keyToDel);
    }

    return (
        <Component>
            <Title>{isBodyInput ? "Body" : "Headers"}</Title>
            <JSONInput deleteProperty = {deleteProperty} addNewProperty = {addNewProperty} data = {value} edit = {editBody} />
        </Component>
    )
}

export default BodyOrHeaderInput;