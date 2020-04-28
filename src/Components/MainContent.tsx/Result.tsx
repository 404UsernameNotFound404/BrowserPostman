import React from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';

const Component = styled.div`
    width: 80%;
    margin: 0 2.5%;
`;

const Title = styled.h4`
    font-size: 1.75em;
    color: white;
`;

const ResultValue = styled.div`
    border: thin solid grey;
    width: 100%;
`;

const Value = styled.h2`
    color: white;
    width: 100%;
`;

const Pre = styled.pre`
    white-space: pre-wrap;       /* css-3 */
 white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
 white-space: -pre-wrap;      /* Opera 4-6 */
 white-space: -o-pre-wrap;    /* Opera 7 */
 word-wrap: break-word;       /* Internet Explorer 5.5+ */
`;

type Props = {
    result: any;
}

function Result(props: Props) {
    return (
        <Component>
            <Title>Result</Title>
            {/* <ResultValue>
                <Value>
                    <Pre>{JSON.stringify(props.result, null, 2)}</Pre>
                </Value>
            </ResultValue> */}
            <ReactJson style = {{fontSize: "1.5em"}} theme = {"monokai"} src={props.result} />
        </Component>
    )
}

export default Result;