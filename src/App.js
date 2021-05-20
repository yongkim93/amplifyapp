import React from "react";
import logo from "./logo.svg";
import Navs from "./navs/Navs";
import "./App.scss";
import Main from "./main/Main";
import Sticker from "./sticker/Sticker";
import Calendar from "./calendar/Calendar";
import DragAndDrop from "./drag-and-drop/DragAndDrop";
import DragAndCreate from "./drag-and-create/DragAndCreate";
import VerticalGrid from "./responsive-grid/VerticalGrid";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserInfoProvider } from "./google-login/googleUtil";
import { useWindowSize, WindowSizeProvider } from "./utility/windowSizeManager";

class App extends React.Component {
  componentDidMount() {
    // const semanticJs = document.createElement("script");
    // const semanticCss = document.createElement("link");
    // semanticCss.rel = "stylesheet";
    // semanticCss.href = "https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css";
    // semanticJs.src = "https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js";
    // semanticJs.async = true;
    // document.body.appendChild(semanticJs);
    // document.body.appendChild(semanticCss);
  }

  render() {
    return (
      <UserInfoProvider>
        <div className="App fulldemention noselect full-height">
          <div className="Banner">
            <h1 className="banner-title">Welcome to Yongshine.info</h1>
          </div>
          <Router>
            <div className="nav-section">
              <Navs />
            </div>
            <div className="main">
              <div className="card-body" style={{width: "100%"}}>
                <Switch>
                  <Route path="/VerticalGrid">
                    <WindowSizeProvider>
                      <VerticalGrid />
                    </WindowSizeProvider>
                  </Route>
                  <Route path="/DragAndCreate">
                    <DragAndCreate />
                  </Route>
                  <Route path="/DragAndDrop">
                    <DragAndDrop />
                  </Route>
                  <Route path="/appointment">
                    <Calendar />
                  </Route>
                  <Route path="/">
                    <Main />
                  </Route>
                </Switch>
              </div>
            </div>
          </Router>
        </div>
      </UserInfoProvider>
    );
  }
}

export default App;
