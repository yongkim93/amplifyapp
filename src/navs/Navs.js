import React from 'react'
import './Navs.scss'
import Main from '../main/Main'
import Sticker from '../sticker/Sticker'
import Calendar from '../calendar/Calendar'

function Navs () {
  return (
        <div className="card text-center">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">
                            Home
                        </a>

                        <a className="navbar-item">
                            Documentation
                        </a>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                More
                            </a>

                            <div className="navbar-dropdown">
                                <a className="navbar-item">
                                    About
                                </a>
                                <a className="navbar-item">
                                    Jobs
                                </a>
                                <a className="navbar-item">
                                    Contact
                                </a>
                                <hr className="navbar-divider" />
                                <a className="navbar-item">
                                    Report an issue
                                 </a>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button is-light">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="card-body">
                <Main />
                {/* <Sticker /> */}
                <Calendar />
            </div>
        </div>
  )
}
function httpReq () {
  const Http = new XMLHttpRequest()
  const url = 'https://vp9rxx6qx3.execute-api.us-east-1.amazonaws.com/prod/'
  Http.open('POST', url)
  Http.send()

  Http.onreadystatechange = (e) => {
    const res = JSON.parse(Http.response)
    console.log(res)
    const imgs = res.Contents.map(img => img.Key.replace('yong/', ''))
    console.log(imgs)
  }
}

export default Navs
