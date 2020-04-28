import React from 'react';
import styled from 'styled-components';
import { AppContext } from './Context/AppContext';
import { useState } from 'react';
import LeftSideBar from './Components/LeftSideBar/LeftSideBar';
import MainContent from './Components/MainContent.tsx/MainContent';

const AppStyle = styled.div`
  width: 100%;
  height: 100vh;
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
        url: "http://localhost:4000/organization/",
        type: "GET",
        body: {
          test: "hello"
        },
        headers: {
          test: "hello"
        },
        active: true
      },
      {
        id: 1,
        url: "localhost:3000/dick",
        type: "GET",
        body: {
          test: "hello"
        },
        headers: {
          test: "hello"
        },
        active: false
      },
      {
        id: 2,
        url: "localhost:3000/dick",
        type: "GET",
        body: {
          test: "hello"
        },
        headers: {
          test: "hello"
        },
        active: false
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
