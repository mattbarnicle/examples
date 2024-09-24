import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import { UserContext } from './providers/UserContext.js';

import { videoCourse } from './data/data.js';
import {
  VideoCourseModulesTable
} from './video-course-modules-table/VideoCourseModulesTable.jsx';

export function AppContainer () {
  return (
    <div className="app-container">
      <VideoCourseModulesTable videoCourse={ videoCourse } />
    </div>
  );
}

function App () {
  const [ user, setUser ] = useState({ products: [] });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppContainer />
      <ToastContainer autoClose={ 1000 } theme="colored" position="top-left" />
    </UserContext.Provider>
  );
}

export default App;
