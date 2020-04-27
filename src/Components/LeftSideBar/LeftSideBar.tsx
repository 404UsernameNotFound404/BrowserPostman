import React from 'react';
import styled from 'styled-components';
import RequestMenu from './RequestMenu/RequestMenu';

//width should potential be change able
const Component = styled.div`
    width: 25%;
    height: 100%;
    border-right: white thick solid;
`;

type Props = {

}

function LeftSideBar(props: Props) {
    return (
        <Component>
            <RequestMenu />
        </Component>
    )
}

export default LeftSideBar;