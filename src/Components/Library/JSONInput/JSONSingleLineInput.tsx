import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AutosizeInput from 'react-input-autosize';

const Component = styled.div`
    width: 100%;
    margin: 0 2.5%;
    display: flex;
    font-size: 1rem;
`;

type KeyProps = {
    widthOfInput: string
}

const Key = styled.input<KeyProps>`
    color: orange;
    margin: auto 0;
    /* margin-right: 0.5em; */
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1rem;
    min-width: 20px;
    width: ${p => p.widthOfInput};
`;

const Value = styled.input<KeyProps>`
     margin: auto 0;
    margin-left: 0.2em;
    /* margin-right: 0.5em; */
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1rem;
    min-width: 20px;
    width: ${p => p.widthOfInput};
`;

const GhostText = styled.h1`
    position: absolute;
    left: -100em;
    width: fit-content;
    bottom: 2em;
    font-size: 1.5rem;
`;

type IconProps = {
    color: string
}

const Icon = styled.h4<IconProps>`
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    background-color: ${p => p.color};
    color: white;
    line-height: 1.3rem;
    text-align: center;
    font-size: 1.25em;
    margin: auto 0.2em;
`;

type Props = {
    objKey: string,
    value: any, 
    editKey: Function,
    editValue: Function,
    deleteProperty: Function,
    id: number
}

function JSONSingleLineInput(props: Props) {
    const [reset, setReset] = useState(true);
    const ghostText = useRef(null);

    useEffect(() => {
        setReset(!reset);
    }, [ghostText])

    const calcWidth = (isKey: boolean) => {
        //the ts ignore because typescript is dumb and can't see it's in a if statement this boils my blood if your are not going to run the code you better be damn sure it's not write give a warning if you think it might be null F:ASD[as;d a;lsdasd]
        if (ghostText != null && ghostText.current != undefined && ghostText.current != null) {
            //@ts-ignore
            ghostText.current.style.fontSize = "1rem";
            //@ts-ignore
            ghostText.current.innerHTML = isKey ? props.objKey : props.value;
            //@ts-ignore
            return (ghostText.current.clientWidth + 4) + "px";
        } 
        return "0px"
    }

    const updateTempKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.editKey(props.id, e.target.value);
    };

    const updateTempValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.editValue(props.id, e.target.value);
    };



    return (
        <Component>
            <div style = {{overflow: 'none'}}>
                <GhostText ref={ghostText}></GhostText>
            </div>
            "<Key onChange = {updateTempKey} widthOfInput={calcWidth(true)} value={props.objKey} />"
            :
            <Value widthOfInput = {calcWidth(false)} value = {props.value} onChange = {updateTempValue} />
            <Icon onClick = {() => {props.deleteProperty(props.objKey)}} color = "red">-</Icon>
        </Component>
    )
}

export default JSONSingleLineInput;