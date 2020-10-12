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
      <div className="nav">
        <Navs />
      </div>
      <header className="App-header">
        <h1>Hello from V2</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Main />
      </header>
    </div>
  );
}

export default App;
