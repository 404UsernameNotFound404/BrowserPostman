import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import TypeSelection from './TypeSelection';
import URLInput from './URLInput';
import { AppContext } from '../../../Context/AppContext';
import { MainContentContext } from '../../../Context/MainContentContext';

const Component = styled.div`
    width: 100%;
    height: 4em;
    padding: 1em;
    display: flex;
`;

const SendRequest = styled.div`
    height: 100%;
    width: 5rem;
    margin-left: 1em;
    padding: 0 1em;
    background-color: #3c78d8;
    display: flex;
    justify-content: center;
    border-radius: 0.25em;
    cursor: pointer;
    &:hover {
        background-color: #2256ac;
    }
`;

const SendRequestText = styled.p`
    margin: auto;
    text-align: center;
    font-size: 1.75em;
    color: white;
    
`;

function TopBar() {
    const c = useContext(MainContentContext);

    return (
        <Component>
            <TypeSelection />
            <URLInput />
            <SendRequest onClick = {c.sendRequest}><SendRequestText>Send</SendRequestText></SendRequest>
        </Component>
    )
}

export default TopBar;