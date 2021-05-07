import React from 'react'
import logo from './logo.svg'
import Navs from './navs/Navs'
import './App.scss'

class App extends React.Component {
  componentDidMount () {
    // const semanticJs = document.createElement("script");
    // const semanticCss = document.createElement("link");
    // semanticCss.rel = "stylesheet";
    // semanticCss.href = "https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css";
    // semanticJs.src = "https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js";
    // semanticJs.async = true;

    // document.body.appendChild(semanticJs);
    // document.body.appendChild(semanticCss);
  }

  render () {
    return (
      <div className="App fulldemention">
        <div className="Banner">
          <h1 className="banner-title">Welcome to Yongshine.info</h1>
        </div>
        <div className="nav-section">
          <Navs />
        </div>
        <div className="main">
        </div>
      </div>
    )
  }
}

export default App
