import React, { useContext } from 'react';
import styled from 'styled-components';
import RequestMenuItem from './RequestMenuItem';
import { RequestMenuContext } from '../../../Context/RequestMenuContext';
import { AppContext } from '../../../Context/AppContext';

const Component = styled.div`
    width: 100%;
`;

const FolderTab = styled.div`
    background-color: darkblue;
    height: 2.5em;
    display: flex;
`;

const Name = styled.input`
    font-size: 1.25em;
    color: white;
    margin: auto 0; 
    margin-left: 0.25em;
    background-color: transparent;
    border: none;
    width: 55%;
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
    name: string,
    requests: { url: string, type: string, active: boolean, id: number }[],
    open: boolean,
    id: number
}

function RequestFolder(props: Props) {
    const { name, requests, open } = props;
    const c = useContext(RequestMenuContext);
    const appC = useContext(AppContext);

    const changeFolderName = (e: React.ChangeEvent<HTMLInputElement>) => {
        appC.folders = appC.folders.map(ele => {
            if (ele.id == props.id) ele.name = e.target.value;
            return ele;
        });
        appC.setFolders(appC.folders)
    }

    const addRequest = () => {
        appC.folders = appC.folders.map(ele => {
            if (ele.id == props.id) {
                let url = "localhost:4000";
                let type = "GET";
                let headers = {};
                //if there are any requests it will copy last requests setting expect body
                if (ele.requests.length >= 1) {
                    //checks if url has slash. If so it will take everything before slash. If not it will take whole url previously used
                    if (ele.requests[ele.requests.length - 1].url.substring(0, 7) == "http://" || ele.requests[ele.requests.length - 1].url.substring(0, 8) == "https://") {
                        let startPointOfUrl = ele.requests[ele.requests.length - 1].url.substring(0, 7) == "http://" ? 7 : 8;
                        let urlWithoutHTTP = ele.requests[ele.requests.length - 1].url.substring(startPointOfUrl, ele.requests[ele.requests.length - 1].url.length - 1);
                        url = urlWithoutHTTP.indexOf("/") == -1 ? ele.requests[ele.requests.length - 1].url : ((startPointOfUrl == 7 ? "http://" : "https://") + urlWithoutHTTP.substring(0, urlWithoutHTTP.indexOf("/")));
                    } else {
                        url = ele.requests[ele.requests.length - 1].url.indexOf("/") == -1 ? ele.requests[ele.requests.length - 1].url : ele.requests[ele.requests.length - 1].url.substring(0, ele.requests[ele.requests.length - 1].url.indexOf("/"));
                    }
                    type = ele.requests[ele.requests.length - 1].type;
                    headers = ele.requests[ele.requests.length - 1].headers;
                }
                ele.requests.push({ id: Math.floor(Math.random() * 99999), url: url, type: type, body: {}, headers: headers, active: false})
            }
            return ele;
        });
        appC.setFolders(appC.folders)
    }

    const deleteReq = (id: number) => {
        console.log("del")
        appC.folders = appC.folders.map(ele => { 
            if (props.id == ele.id) {
                //TODO logic if deleted request is selected request
                ele.requests = ele.requests.filter(eleR => eleR.id != id)
            }
            return ele;
        });
        appC.setFolders(appC.folders);
    }
    return (
        <Component>
            <FolderTab>
                <Name value={name} onChange={changeFolderName} type="text" />
                <Icon color = "green" onClick = {addRequest}>+</Icon>
                <Icon color = "red" onClick={() => { c.deleteFolder(props.id) }}>-</Icon>
                <Icon color = "green" onClick={() => { c.openCloseFolder(props.id) }}>{!open ? "↓" : "↑"}</Icon>
            </FolderTab>
            {
                open ? requests.map(ele => <RequestMenuItem deleteReq = {deleteReq} id={ele.id} active={ele.active} url={ele.url} type={ele.type} key={ele.id} />) : ""
            }
        </Component>
    )
}

export default RequestFolder;