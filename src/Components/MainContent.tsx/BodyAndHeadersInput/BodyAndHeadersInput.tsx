import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import BodyOrHeaderInput from './BodyOrHeaderInput';
import { MainContentContext } from '../../../Context/MainContentContext';
import { AppContext } from '../../../Context/AppContext';

const Component = styled.div`   
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`;

type Props = {

}

function BodyAndHeadersInput(props: Props) {
    const [shift, setShift] = useState(false);

    const c = useContext(MainContentContext);
    const cApp = useContext(AppContext);

    const updateBodyOrHeaders = (isBody: boolean, newValue: any) => {
        cApp.folders = cApp.folders.map(ele => {
            ele.requests = ele.requests.map(eleR => {
                if (eleR.active) {
                    if (isBody) return { ...eleR, body: newValue };
                    else return { ...eleR, headers: newValue };
                }
                return eleR;
            })
            return ele;
        })
        cApp.setFolders(cApp.folders);
    }

    const addNewProperty = (isBody: boolean) => {
        cApp.folders = cApp.folders.map(ele => {
            ele.requests = ele.requests.map(eleR => {
                if (eleR.active) {
                    //this can cause bug by not creating new if there is already a key property
                    let oldObjWithNew = isBody ? ({...eleR.body, key: "value"}) : ({...eleR.headers, key: "value"});
                    if (isBody && eleR.body.key != undefined) oldObjWithNew["key" + Math.floor(Math.random() * 100)] = "value";
                    if (!isBody && eleR.headers.key != undefined) oldObjWithNew["key" + Math.floor(Math.random() * 100)] = "value";
                    if (isBody) return { ...eleR, body: oldObjWithNew };
                    else return { ...eleR, headers: oldObjWithNew };
                }
                return eleR;
            })
            return ele;
        })
        cApp.setFolders(cApp.folders);
    }

    const deleteProperty = (isBody: boolean, keyToDel: string) => {
        cApp.folders = cApp.folders.map(ele => {
            ele.requests = ele.requests.map(eleR => {
                if (eleR.active) {
                    //this can cause bug by not creating new if there is already a key property
                    let oldObjWithNew = isBody ? ({...eleR.body}) : ({...eleR.headers});
                    delete oldObjWithNew[keyToDel];
                    if (isBody) return { ...eleR, body: oldObjWithNew };
                    else return { ...eleR, headers: oldObjWithNew };
                }
                return eleR;
            })
            return ele;
        })
        cApp.setFolders(cApp.folders);
    }

    return (
        <Component>
            <BodyOrHeaderInput deleteProperty = {deleteProperty} addNewProperty = {addNewProperty} updateBodyOrHeaders = {updateBodyOrHeaders} value={c.activeRequest.body} isBodyInput={true} />
            <BodyOrHeaderInput deleteProperty = {deleteProperty} addNewProperty = {addNewProperty} updateBodyOrHeaders = {updateBodyOrHeaders} value={c.activeRequest.headers} isBodyInput={false} />
        </Component>
    )
}

export default BodyAndHeadersInput;