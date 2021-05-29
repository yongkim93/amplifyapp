import React, { Fragment } from 'react'
import './SideNav.scss'
import { useDateTimeManager } from '../utility/DateTimeManager'
const onClickIcon = () => {
  document.getElementById('side-nav-content').style.width = '200px'
}

const onClickClose = () => {
  document.getElementById('side-nav-content').style.width = '0px'
}
const SideNav = () => {
  const { state: dateTimeState } = useDateTimeManager()

  return (
    <Fragment>
      <div id="side-nav-content">
        <div className="side-nav-close-button">
          <button className="delete margin" onClick={onClickClose}></button>
        </div>
      </div>
      <div className="sideNav" onClick={onClickIcon}>
        <div className="side-nav-text">Open Calendar</div>
        <i className="fas fa-calendar-day cal-icon"></i>
      </div>
    </Fragment>
  )
}

export default SideNav
