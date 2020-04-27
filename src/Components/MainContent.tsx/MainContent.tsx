import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import TopBar from './TopBar/TopBar';
import { AppContext } from '../../Context/AppContext';
import BodyAndHeadersInput from './BodyAndHeadersInput/BodyAndHeadersInput';

const Component = styled.div`
    width: 77.5%;
    height: 100%;
`;

type Props = {

}

function MainContent(props: Props) {

    return (
        <Component>
            <TopBar />
            <BodyAndHeadersInput />
        </Component>
    )
}

export default MainContent;