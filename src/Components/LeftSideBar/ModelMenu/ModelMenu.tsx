import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../Context/AppContext';
import Model from './Model';

const Component = styled.div`
`;

const Title = styled.h1`
    text-align: center;
    width: 100%;
    font-size: 1.75em;
    color: white;
    text-decoration: underline;
    margin-bottom: 0.5em;
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
    margin-top: 0.5em;
`;

type Props = {

}

function ModelMenu(props: Props) {
    const c = useContext(AppContext);

    const deleteModel = () => {

    }

    const addModelToBodyOrHeader = () => {
        
    }

    return (
        <Component>
            <Title>Model Menu</Title>
            {
                c.models.map(ele => <Model name = {ele.name} delete = {deleteModel} copy = {addModelToBodyOrHeader} />)
            }
            <Icon color = {"green"}>+</Icon>
            {
                
            }
        </Component>
    )
}

export default ModelMenu;