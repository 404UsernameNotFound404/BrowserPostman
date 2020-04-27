import {createContext } from 'react';
import { string } from 'prop-types';

type Request = {
    url: string,
    type: string,
    body: any,
    headers: any
}

export const AppContext = createContext({
    folders: [{
        name: "main",
        requests: [] as Array<any>,
        open: true,
        id: 0
    }],
    setFolders: undefined as any,
    models: [
        {
            name: "Student",
            attributes: {
                name: "string",
                studentID: "string"
            }
        }
    ],
    setModels: undefined as any
})