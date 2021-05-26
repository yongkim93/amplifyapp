import React from 'react'
import Navs from './navs/Navs'
import './App.scss'
import Main from './main/Main'
import Calendar from './calendar/Calendar'
import DragAndDrop from './drag-and-drop/DragAndDrop'
import DragAndCreate from './drag-and-create/DragAndCreate'
import VerticalGrid from './responsive-grid/VerticalGrid'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { UserInfoProvider } from './google-login/googleUtil'
import { WindowSizeProvider } from './utility/windowSizeManager'
import { DateTimeProvider } from './utility/DateTimeManager'
import { EventManagerProvider } from './utility/useEventManager'

const App = () => {
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
            <div className="card-body" style={{ width: '100%' }}>
              <Switch>
                <Route path="/VerticalGrid">
                  <WindowSizeProvider>
                    <DateTimeProvider>
                      <EventManagerProvider>
                        <VerticalGrid />
                      </EventManagerProvider>
                    </DateTimeProvider>
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
  )
}

export default App
