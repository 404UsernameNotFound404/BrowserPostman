import React, { ReactNode, useContext } from 'react'
import styled from 'styled-components';

const Component = styled.div`
    left: 0;
    top: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(100,100,100,0.5);
    z-index: 100000;
    display: flex;
    justify-content: center;
`;

type ContentProps = {
    width: string,
    darkTheme: boolean
}

const Content = styled.div<ContentProps>`
    width: ${p => p.width};
    background-color: ${p => p.darkTheme ? "#232323" : "white"};
    min-height: 10rem;
    height: fit-content;
    margin: auto;
    border-radius: 1.5rem;
    border: 0.15em solid ${p => p.darkTheme ? "rgb(125,125,125)" : "rgb(125,125,125)"};
    position: relative;
`;

type CloseIconProps = {
    darkTheme: boolean
}

const CloseIcon = styled.h4<CloseIconProps>`
    font-size: 1.5em;
    position: absolute;
    right: 0.5em;
    top: 0.5em;
    margin: 0;
    color: ${p => p.darkTheme ? "white" : "black"};
    cursor: pointer;
    &:hover {
        color: ${p => p.darkTheme ? "grey" : "grey"};;
    }
`;

type Props = {
    close: boolean,
    setClose: React.Dispatch<React.SetStateAction<boolean>>,
    children: ReactNode[] | ReactNode,
    width?: string,
    darkTheme?: boolean
}

function ContactModal(props: Props) {
    const width = props.width ? props.width : "40em";
    const darkTheme = props.darkTheme ? props.darkTheme : false;
    if (props.close) {
    return (
        <Component>
            <Content darkTheme = {darkTheme} width = {width}>
                <CloseIcon darkTheme = {darkTheme} onClick = {() => {props.setClose(false)}}>X</CloseIcon>
                {props.children}
            </Content>
        </Component>
    )
    } else {
        return (<></>)
    }
}

export default ContactModal;