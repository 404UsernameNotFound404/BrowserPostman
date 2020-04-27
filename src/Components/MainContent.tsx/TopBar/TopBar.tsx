import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import TypeSelection from './TypeSelection';
import URLInput from './URLInput';
import { AppContext } from '../../../Context/AppContext';

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

type Props = {
}

function TopBar(props: Props) {
    const c = useContext(AppContext);
    const [activeRequestValues, setActiveRequestValues] = useState({url: "", type: ""})
    useEffect(() => {
        //checking for active request
        if (!!(c.folders.find(ele => ele.requests.find(ele => ele.active)))) {
            c.folders.find(ele => {
                ele.requests.find(eleR => {
                    if (eleR.active) setActiveRequestValues({url: eleR.url, type: eleR.type});
                });
            });
        } else {
            setActiveRequestValues({url: "please select or create a request", type: "GET"})
        }
        
    }, [c.folders])

    return (
        <Component>
            <TypeSelection type = {activeRequestValues.type} />
            <URLInput url = {activeRequestValues.url}/>
            <SendRequest><SendRequestText>Send</SendRequestText></SendRequest>
        </Component>
    )
}

export default TopBar;