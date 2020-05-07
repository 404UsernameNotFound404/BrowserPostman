import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import TopBar from './TopBar/TopBar';
import { AppContext } from '../../Context/AppContext';
import BodyAndHeadersInput from './BodyAndHeadersInput/BodyAndHeadersInput';
import { MainContentContext } from '../../Context/MainContentContext';
import Result from './Result';

const Component = styled.div`
    width: 70%;
    height: 100%;
`;

type Props = {

}

function MainContent(props: Props) {
    const c = useContext(AppContext);
    const [activeRequestValues, setActiveRequestValues] = useState({ url: "", type: "", body: {}, headers: {} });
    const [reqResult, setReqResult] = useState({});

    useEffect(() => {
        //checking for active request
        if (!!(c.folders.find(ele => ele.requests.find(ele => ele.active)))) {
            c.folders.find(ele => {
                ele.requests.find(eleR => {
                    if (eleR.active) setActiveRequestValues({ url: eleR.url, type: eleR.type, body: eleR.body, headers: eleR.headers });
                });
            });
        } else {
            setActiveRequestValues({ url: "please select or create a request", type: "GET", body: "", headers: "" })
        }
    }, [c.folders])

    const sendRequest = async () => {
        try {
            if (typeof activeRequestValues.body == "object") {
                Object.entries(activeRequestValues.body).map(ele => {
                    if (typeof ele[1] == "string" && ((ele[1][0] == '"' && ele[1][ele[1].length - 1] == '"') || (ele[1][0] == "'" && ele[1][ele[1].length - 1] == "'"))) {
                        //@ts-ignore
                        activeRequestValues.body[ele[0]] = ele[1].substring(1, ele[1].length - 1);
                        return;
                    }
                    //@ts-ignore
                    if (ele[1] == "true" || ele[1] == "false") activeRequestValues.body[ele[0]] = (ele[1] == "true")
                    //@ts-ignore
                    if (!isNaN(ele[1] as any)) activeRequestValues.body[ele[0]] = parseFloat(ele[1]);
                })
            }
            console.log(activeRequestValues.body)
            // console.log(activeRequestValues.body)
            let options = {
                method: activeRequestValues.type,
                headers: {
                    ...activeRequestValues.headers,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                },
                body: JSON.stringify(activeRequestValues.body),
            }
            // if (activeRequestValues.type.toLowerCase() == "get") delete options.body;
            const resRaw = await fetch(activeRequestValues.url, options)
            let res = await resRaw.json();
            setReqResult(res);
        } catch (err) {
            console.log("errr")
            console.log(err);
        }
    }

    return (
        <Component>
            <MainContentContext.Provider value={{ activeRequest: activeRequestValues, sendRequest: sendRequest }}>
                <TopBar />
                <BodyAndHeadersInput />
                <Result result={reqResult} />
            </MainContentContext.Provider>
        </Component>
    )
}

export default MainContent;