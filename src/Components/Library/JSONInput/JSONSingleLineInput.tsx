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
    edit: any,
    deleteProperty: Function
}

function JSONSingleLineInput(props: Props) {
    const [tempKeyValue, setTempKeyValue] = useState("");
    const [tempValue, setTempValue] = useState("");
    const [reset, setReset] = useState(true);

    useEffect(() => {
        setTempKeyValue(props.objKey);
        if (typeof props.value == "boolean") {
            setTempValue(props.value ? "true" : "false")
        } else {
            console.log(props.value[0])
            console.log(props.value[props.value.length - 1])
            if (!(props.value[0] == '"' && props.value[props.value.length - 1] == '"')) {
                setTempValue('"' + props.value + '"');
            } else  setTempValue(props.value);
        }
    }, [props.objKey, props.value])

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
            ghostText.current.innerHTML = isKey ? tempKeyValue : tempValue;
            //@ts-ignore
            return (ghostText.current.clientWidth + 4) + "px";
        } 
        return "0px"
    }
    
    const updateKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.edit(false, tempKeyValue, props.objKey)
    }

    const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        //some logic for num/true and false
        let finalValue = tempValue;
        if (finalValue[0] == '"') finalValue = finalValue.substring(1, finalValue.length - 1);
        if (finalValue[finalValue.length - 1] == '"') finalValue = finalValue.substring(0, finalValue.length);
        props.edit(true, finalValue, props.objKey)
    }

    const updateTempKey = (e: React.ChangeEvent<HTMLInputElement>) => {setTempKeyValue(e.target.value)};

    const updateTempValue = (e: React.ChangeEvent<HTMLInputElement>) => {setTempValue(e.target.value)};

    return (
        <Component>
            <div style = {{overflow: 'none'}}>
                <GhostText ref={ghostText}></GhostText>
            </div>
            "<Key onChange = {updateTempKey} onBlur = {updateKey} widthOfInput={calcWidth(true)} value={tempKeyValue} />"
            :
            <Value onBlur = {updateValue} widthOfInput = {calcWidth(false)} value = {tempValue} onChange = {updateTempValue} />
            <Icon onClick = {() => {props.deleteProperty(props.objKey)}} color = "red">-</Icon>
        </Component>
    )
}

export default JSONSingleLineInput;