import React, { useContext } from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';
import { AppContext } from '../../../Context/AppContext';


const Component = styled.input`
    width: 40rem;
    height: 100%;
    background-color: #383838;
    border: none;
    padding: 0 0.5rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    color: white;
    font-size: 1.5em;

`;

type Props = {
    url: string
}

function URLInput(props: Props) {
    const c = useContext(AppContext);

    const updateURL = (e: React.ChangeEvent<HTMLInputElement>) => {
        c.folders = c.folders.map(ele => {
            ele.requests = ele.requests.map(eleR => {
                if (eleR.active) return { ...eleR, url: e.target.value };
                return eleR;
            })
            return ele;
        })
        c.setFolders(c.folders);
    }

    return (
        <Component value = {props.url} onChange = {updateURL} />
    )
}

export default URLInput;