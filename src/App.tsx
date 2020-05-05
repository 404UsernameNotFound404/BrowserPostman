import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AppContext } from './Context/AppContext';
import { useState } from 'react';
import LeftSideBar from './Components/LeftSideBar/LeftSideBar';
import MainContent from './Components/MainContent.tsx/MainContent';
import Cookie from 'js-cookie'
import useInterval from '@use-it/interval';

const AppStyle = styled.div`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  background-color: #232323;
  display: flex;
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
`;

function App() {
  const [folders, setFolders] = useState([{
    name: "main",
    requests: [
      {
        id: 0,
        url: "http://localhost:3000/",
        type: "GET",
        body: {
        },
        headers: {
        },
        active: true
      }
    ],
    open: true,
    id: 0
  }
  ]);
  const [models, setModels] = useState([
    {
      name: "Student",
      attributes: {
        name: "string",
        studentID: "string"
      }
    }]);
  const [doneGettingCokkies, setDoneGettingCookies] = useState(false);

  useEffect(() => {
    let cookieFolders = Cookie.get("folders");
    let cookieModels = Cookie.get("models");

    if (!!cookieFolders) setFolders(JSON.parse(cookieFolders));
    if (!!cookieModels) setModels(JSON.parse(cookieModels));

    setDoneGettingCookies(true);
  }, []);

  
  useInterval(() => {
    Cookie.set('folders', JSON.stringify(folders));
    Cookie.set('models', JSON.stringify(models));
  }, 1000)

  return (
    <div>
      <AppContext.Provider value={{ folders: folders, setFolders: setFolders, models: models, setModels: setModels }}>
        <AppStyle>
          <LeftSideBar />
          <MainContent />
        </AppStyle>
      </AppContext.Provider>
    </div>
  );
}

export default App;
