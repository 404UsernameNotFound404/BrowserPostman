import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../Context/AppContext';

const Component = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: lightgrey;
    height: 3em;
    width: 100%;
    justify-content: space-between;
    outline: thin solid white;
`;

const Name = styled.h4`
    text-align: left;
    width: 50%;
    margin: auto 0;

    padding: 0 0.1em;
    font-size: 1.5rem;

    text-overflow: ellipsis;
    /* Required for text-overflow to do anything */
    white-space: nowrap;
    overflow: hidden;
`;

type CopyTextProps = {
    backColor: string
}

const CopyText = styled.h4<CopyTextProps>`
    text-align: center;
    width: 100%;
    margin: auto;

    cursor: pointer;
    &:hover {
        color: white;
    }
    font-size: 1.25rem;
`;

const EditText = styled.h4`
    font-size: 1.25rem;
    margin: auto;
    text-align: center;
    width: 100%;
    cursor: pointer;
    &:hover {
        color: white;
    }
`;

const CopyContainer = styled.div`
    width: 25%;
    margin: auto 0;
`;

const EditContainer = styled.div`
    width: 12%;
    height: 100%; 
`;

const WhiteLine = styled.div`
    height: 100%;
    width: 0.5%;
    background-color: white;
    margin: 0 1.5%;
`;

type Props = {
    name: string,
    deleteFunc: Function,
    copy: Function,
    edit: Function,
    addModelToBodyOrHeader: Function
}

function Model(props: Props) {

    return (
        <Component>
            <Name>{props.name}</Name>
            <WhiteLine />
            <EditContainer>
                <EditText onClick = {() => {props.edit(props.name)}}>Edit</EditText>
                <EditText onClick = {() => {props.deleteFunc(props.name)}}>Del</EditText>
            </EditContainer>
            <WhiteLine />
            <CopyContainer>
                <CopyText onClick = {() => {props.addModelToBodyOrHeader(true, props.name)}} backColor={"blue"}>Body</CopyText>
                <CopyText onClick = {() => {props.addModelToBodyOrHeader(false, props.name)}} backColor={"red"}>Headers</CopyText>
            </CopyContainer>
        </Component>
    )
}

export default Model;