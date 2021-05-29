import React from 'react'
import './ApptNav.scss'

const ApptNav = () => {
  return (
    <div className="tabs is-fullwidth bottom-appt-nav">
      <ul>
        <li className="border-top button-left">
          <span className="icon">
            <i className="fas fa-chevron-left" aria-hidden="true"></i>
          </span>
        </li>
        <li className="border-top border-left border-right button-middle">
          <span className="icon">
            <i className="fas fa-bars" aria-hidden="true"></i>
          </span>
        </li>
        <li className="border-top button-right">
          <span className="icon">
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
          </span>
        </li>
      </ul>
    </div>
  )
}

export default ApptNav
