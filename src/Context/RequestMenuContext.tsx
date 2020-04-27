import {createContext } from 'react';
import { string } from 'prop-types';

export const RequestMenuContext = createContext({
    changeActiveRequest: (id: number) => {},
    openCloseFolder: (id: number) => {},
    deleteFolder: (id: number) => {}
})