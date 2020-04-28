import {createContext } from 'react';
import { string } from 'prop-types';

export const MainContentContext = createContext({
    activeRequest: {url: "", type: "", body: {}, headers: {}},
    sendRequest: () => {}
})