import React from 'react';
import logo from './logo.svg';
import Main from './main/Main';
import Navs from './navs/Navs';
import './App.scss';

function App() {
  return (
    <div className="App fulldemention">
      <div className="Banner">
        <h1 className="banner-title">Welcome to Yongshine.info</h1>
      </div>
      <div className="nav-section">
        <Navs />
      </div>
      <div className="main">
        <Main />
      </div>
    </div>
  );
}

export default App;
