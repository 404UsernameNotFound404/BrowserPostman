import React from 'react';
import styled from 'styled-components';

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
`;

type Props = {
    result: any;
}

function Result(props: Props) {
    return (
        <Component>
            <Title>Result</Title>
            <ResultValue>
                <Value>
                    <pre>{JSON.stringify(props.result, null, 2)}</pre>
                </Value>
            </ResultValue>
        </Component>
    )
}

export default Result;