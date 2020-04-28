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

    const updateBodyOrHeaders = (isBody: boolean, e: React.ChangeEvent<HTMLTextAreaElement>) => {
        cApp.folders = cApp.folders.map(ele => {
            ele.requests = ele.requests.map(eleR => {
                if (eleR.active) {
                    if (isBody) return { ...eleR, body: e.target.value };
                    else return { ...eleR, headers: e.target.value };
                }
                return eleR;
            })
            return ele;
        })
        cApp.setFolders(cApp.folders);
    }

    const updateBodyOrHeadersKeycode = (isBody: boolean, e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        console.log(e.keyCode)
        cApp.folders = cApp.folders.map(ele => {
            ele.requests = ele.requests.map(eleR => {
                let char = String.fromCharCode(e.keyCode);
                if (eleR.active) {
                    switch(e.keyCode) {
                        case 9: 
                            char = (eleR.body += "    ");
                        break;
                        case 8:
                            console.log(isBody)
                            if (isBody) return {...eleR, body: eleR.body.substring(0, eleR.body.length - 1)};
                            else return {...eleR, headers: eleR.headers.substring(0, eleR.headers.length - 1)};
                        break;
                        case 16:
                            setShift(true);
                            return eleR;
                        case 219:
                            char = shift ? "{" : "[";
                        break;
                        case 221:
                            char = shift ? "}" : "]";
                            break;
                        break;
                        case 222:
                            char = shift ? '"' : "'";
                            break;
                        case 59:
                            char = shift ? ':' : ";";
                            break;
                        default:
                            char = String.fromCharCode(e.keyCode);
                            if (!shift) {
                                char = char.toLowerCase();
                            } else {
                                char = char.toUpperCase();
                            }
                    }
                    if (isBody) return {...eleR, body: eleR.body += char};
                    else return {...eleR, headers: eleR.headers += char}
                }
                return eleR;
            })
            return ele;
        })
        cApp.setFolders(cApp.folders);
    }

    const checkKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        if (e.keyCode == 16) {
            setShift(false);
        }
    }

    return (
        <Component>
            <BodyOrHeaderInput checkKeyUp = {checkKeyUp} updateBodyOrHeadersKeycode={updateBodyOrHeadersKeycode} updateBodyOrHeaders={updateBodyOrHeaders} value={c.activeRequest.body} isBodyInput={true} />
            <BodyOrHeaderInput checkKeyUp = {checkKeyUp} updateBodyOrHeadersKeycode={updateBodyOrHeadersKeycode} updateBodyOrHeaders={updateBodyOrHeaders} value={c.activeRequest.headers} isBodyInput={false} />
        </Component>
    )
}

export default BodyAndHeadersInput;