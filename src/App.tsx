import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from './Context/AppContext';
import { useState } from 'react';
import LeftSideBar from './Components/LeftSideBar/LeftSideBar';
import MainContent from './Components/MainContent.tsx/MainContent';
import Cookie from 'js-cookie'

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
  const [shouldUpdateFolders, setShouldUpdateFolders] = useState(false);
  const [shouldUpdateModels, setShouldUpdateModels] = useState(false);


  useEffect(() => {
    let cookieFolders = Cookie.get("folders");
    let cookieModels = Cookie.get("models");

    if (!!cookieFolders) setFolders(JSON.parse(cookieFolders));
    if (!!cookieModels) setModels(JSON.parse(cookieModels));

    //starts update cycle
    setShouldUpdateFolders(true);
    setShouldUpdateModels(true);
    updateModels();
    updateFolders();
  }, []);

  useEffect(() => {
    //updates immediately when change is made, but when another change is made within 1 seconds
    //it waits till end of 1 seconds to incorporate change. Then that cycle will repeat
    updateFolders();
  }, [folders])

  useEffect(() => {
    //same as for folders
    updateModels();
  }, [models])

  const updateFolders = () => {
    if (shouldUpdateFolders) {
      setShouldUpdateFolders(false);
      setTimeout(() => {
        setShouldUpdateFolders(true);
        Cookie.set('folders', JSON.stringify(getNewFolders()));
      }, 1000)
      Cookie.set('folders', JSON.stringify(folders));
    }
  }

  const updateModels = () => {
    if (shouldUpdateModels) {
      setShouldUpdateFolders(false);
      setTimeout(() => {
        setShouldUpdateModels(true);
        Cookie.set('models', JSON.stringify(getNewModels()));
      }, 1000)
      Cookie.set('models', JSON.stringify(models));
    }
  }

  //this is because in react a passed in function takes the state at the time it passed in. And I want updated state
  const getNewFolders = () => folders;
  const getNewModels = () => models;

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
