import React, { ReactNode, useContext } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
    width: string
}

const Content = styled.div<ContentProps>`
    width: ${p => p.width};
    background-color: white;
    height: fit-content;
    margin: auto;
    border-radius: 1.5rem;
    border: 0.15em solid rgb(125,125,125);
    position: relative;
`;

const CloseIcon = styled.h4`
    font-size: 1.5em;
    position: absolute;
    right: 0.5em;
    top: 0.5em;
    margin: 0;
    color: grey;
    cursor: pointer;
    &:hover {
        color: black;
    }
`;

type Props = {
    close: boolean,
    setClose: React.Dispatch<React.SetStateAction<boolean>>,
    children: ReactNode[] | ReactNode,
    width?: string
}

function ContactModal(props: Props) {
    const closeIcon = <FontAwesomeIcon icon={faTimes} />
    const width = props.width ? props.width : "40em";
    if (props.close) {
    return (
        <Component>
            <Content width = {width}>
                <CloseIcon onClick = {() => {console.log("here"); props.setClose(false)}}>{closeIcon}</CloseIcon>
                {props.children}
            </Content>
        </Component>
    )
    } else {
        return (<></>)
    }
}

export default ContactModal;