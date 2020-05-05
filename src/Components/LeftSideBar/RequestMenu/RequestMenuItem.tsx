import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { RequestMenuContext } from '../../../Context/RequestMenuContext';

type ComponentProps = {
    active: boolean
}

const Component = styled.div<ComponentProps>`
    display: flex;
    background-color: ${p => !p.active ? "darkgrey" : "lightgrey"};
    height: 2.4em;
`;

const URL = styled.h3`
    text-align: left;
    width: 60%;
    margin: auto;
    border-right: thin solid white;
    padding: 0.5em 0;
    margin-left: 0.5em;

    text-overflow: ellipsis;
    /* Required for text-overflow to do anything */
    white-space: nowrap;
    overflow: hidden;
`;

const Type = styled.h3`
    text-align: center;
    width: 33%;
    /* color: white; */
    margin: auto;

    text-overflow: ellipsis;
    /* Required for text-overflow to do anything */
    white-space: nowrap;
    overflow: hidden;
    font-size: 1.3em;
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
    const [formattedURL, setFormattedURL] = useState("");
    const c = useContext(RequestMenuContext);

    useEffect(() => {
        formatURL();
    }, [props.url])

    const formatURL = () => {
        let startOfRoute = -1;
        for (let x = props.url.length - 1;x >= 0; x--) {
            if (props.url[x] == "/") {
                startOfRoute = x;
            }
            if (props.url[x] == "." || props.url[x] == ":") {
                break;
            }
        }
        if (startOfRoute == -1) setFormattedURL(props.url);
        setFormattedURL(props.url.substring(startOfRoute, props.url.length));
    }
    return (
        <Component active = {props.active}>
            <URL onClick = {() => {c.changeActiveRequest(props.id)}}>{formattedURL}</URL>
            <Type onClick = {() => {c.changeActiveRequest(props.id)}}>{props.type}</Type>
            <Icon onClick = {() => {props.deleteReq(props.id)}} color = "red">-</Icon>
        </Component>
    )
}

export default RequestMenuItem;