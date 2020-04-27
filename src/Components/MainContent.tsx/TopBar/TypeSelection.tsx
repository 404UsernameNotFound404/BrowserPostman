import React, { useContext } from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';
import { AppContext } from '../../../Context/AppContext';

const Select = styled.select`
    width: 10rem;
    height: 100%;
    background-color: #383838;
    border: none;
    border-right: grey thin solid;
    background-color: #383838;
    height: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    line-height: 100%;
    text-align: center;
    color: white;
    font-size: 1.5em;
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
`;

const Option = styled.option`
`;

type Props = {
    type: string
}

function TypeSelection(props: Props) {
    const c = useContext(AppContext);

    const updateTypeSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        c.folders = c.folders.map(ele => {
            ele.requests = ele.requests.map(eleR => {
                if (eleR.active) {
                    return { ...eleR, type: e.target.value };
                }
                return eleR;
            })
            return ele;
        })
        c.setFolders(c.folders);
    }
    
    return (
        <Select value = {props.type} onChange={updateTypeSelection}>
            <Option value="GET">GET</Option>
            <Option value="POST">POST</Option>
            <Option value="PUT">PUT</Option>
            <Option value="DELETE">DELETE</Option>
            <Option value="COPY">COPY</Option>
            <Option value="HEAD">HEAD</Option>
            <Option value="OPTIONS">OPTIONS</Option>
            <Option value="LINK">LINK</Option>
            <Option value="UNLINK">UNLINK</Option>
            <Option value="PURGE">PURGE</Option>
            <Option value="LOCK">LOCK</Option>
            <Option value="UNLOCK">UNLOCK</Option>
            <Option value="PROPFIND">PROPFIND</Option>
            <Option value="VIEW">VIEW</Option>
        </Select>
    )
}

export default TypeSelection;