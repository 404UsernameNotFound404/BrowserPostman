import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../Context/AppContext';
import RequestFolder from './RequestFolder';
import { RequestMenuContext } from '../../../Context/RequestMenuContext';

const Component = styled.div`
    width: 100%;
    height: 50%;
    border-bottom: white solid thick;
    overflow-y: auto;
`;

const Title = styled.div`
    text-align: center;
    width: 100%;
    font-size: 1.75em;
    color: white;
    text-decoration: underline;
    margin-bottom: 0.5em;
`;

const CreateFolder = styled.h4`
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    background-color: green;
    color: white;
    line-height: 2rem;
    text-align: center;
    font-size: 1.75em;
    margin: 0.5em 0.1em;
`;

type Props = {

}

function RequestMenu(props: Props) {
    const c = useContext(AppContext);

    const openCloseFolder = (id: number) => {
        c.folders = c.folders.map(ele => {
            if (ele.id == id) {
                return { ...ele, open: !ele.open }
            }
            return ele;
        });
        c.setFolders(c.folders)
    }

    const changeActiveRequest = (id: number) => {
        c.folders = c.folders.map(ele => {
            ele.requests = ele.requests.map(ele => ({ ...ele, active: ele.id == id }))
            return ele;
        });
        c.setFolders(c.folders)
    }

    const createFolder = () => {
        console.log("hello")
        c.folders = [...c.folders, {
            name: "new",
            requests: [],
            open: false,
            id: Math.floor(Math.random() * 99999) 
        }];
        console.log(c.folders);
        c.setFolders(c.folders);
    }

    const deleteFolder = (id: number) => {
        c.folders = c.folders.filter(ele => !(ele.id == id));
        c.setFolders(c.folders);
    }

    return (
        <Component>
            <RequestMenuContext.Provider value={{ deleteFolder: deleteFolder, changeActiveRequest: changeActiveRequest, openCloseFolder: openCloseFolder }}>
                <Title>Request Menu</Title>
                {
                    c.folders.map(ele => <RequestFolder id={ele.id} open={ele.open} name={ele.name} requests={ele.requests} key = {ele.id} />)
                }
                <CreateFolder onClick = {createFolder}>+</CreateFolder>
            </RequestMenuContext.Provider>
        </Component>
    )
}

export default RequestMenu;