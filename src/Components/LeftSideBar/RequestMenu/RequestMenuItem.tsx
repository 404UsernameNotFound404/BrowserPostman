import React, { useContext } from 'react';
import styled from 'styled-components';
import { RequestMenuContext } from '../../../Context/RequestMenuContext';

type ComponentProps = {
    active: boolean
}

const Component = styled.div<ComponentProps>`
    display: flex;
    background-color: ${p => !p.active ? "darkgrey" : "lightgrey"};
`;

const URL = styled.h3`
    text-align: left;
    width: 60%;
    /* color: white; */
    margin: auto;
    border-right: thin solid white;
    padding: 0.5em 0;

    text-overflow: ellipsis;
    /* Required for text-overflow to do anything */
    white-space: nowrap;
    overflow: hidden;
`;

const Type = styled.h2`
    text-align: center;
    width: 33%;
    /* color: white; */
    margin: auto;

    text-overflow: ellipsis;
    /* Required for text-overflow to do anything */
    white-space: nowrap;
    overflow: hidden;
`;

type IconProps = {
    color: string
}

const Icon = styled.h4<IconProps>`
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    background-color: ${p => p.color};
    color: white;
    line-height: 2rem;
    text-align: center;
    font-size: 1.75em;
    margin: auto 0.2em;
`;



type Props = {
    url: string,
    type: string,
    active: boolean,
    id: number,
    deleteReq: Function
}

function RequestMenuItem(props: Props) {
    const c = useContext(RequestMenuContext);
    return (
        <Component active = {props.active}>
            <URL onClick = {() => {c.changeActiveRequest(props.id)}}>{props.url}</URL>
            <Type onClick = {() => {c.changeActiveRequest(props.id)}}>{props.type}</Type>
            <Icon onClick = {() => {props.deleteReq(props.id)}} color = "red">-</Icon>
        </Component>
    )
}

export default RequestMenuItem;