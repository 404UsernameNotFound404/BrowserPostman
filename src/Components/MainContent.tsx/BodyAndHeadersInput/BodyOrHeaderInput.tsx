import React from 'react';
import styled from 'styled-components';

const Component = styled.div`
    width: 45%;
    margin: 0 2.5%;
`;

const Title = styled.h2`
    color:  white;
    font-size: 1.75em;
`;

const Input = styled.textarea`
    width: 100%;
    height: 10em;
    color: white;
    background-color: transparent;
    border: thin solid grey;
    resize: none;
    padding: 0.25rem;
    font-size: 1.25em;
`;

type Props = {
    isBodyInput: boolean,
    value: string,
    updateBodyOrHeaders: Function,
    updateBodyOrHeadersKeycode: any,
    checkKeyUp: any
}

function BodyOrHeaderInput(props: Props) {
    const {isBodyInput, value} = props;
    return (
        <Component>
            <Title>{isBodyInput ? "Body" : "Headers"}</Title>
            <Input onKeyUp = {props.checkKeyUp} onKeyDown = {(e: React.KeyboardEvent<HTMLTextAreaElement>) => {props.updateBodyOrHeadersKeycode(props.isBodyInput, e)}}  onChange = {(e: React.ChangeEvent<HTMLTextAreaElement>) => {e.preventDefault(); props.updateBodyOrHeaders(props.isBodyInput, e)}} value = {value} />
        </Component>
    )
}

export default BodyOrHeaderInput;