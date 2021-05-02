import React from 'react';
import './Navs.scss';
import Main from '../main/Main';
import Sticker from '../sticker/Sticker';
import Calendar from '../calendar/Calendar';

function Navs() {
    return (
        <div className="card text-center">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </a>

                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item">
                            Home
                        </a>

                        <a class="navbar-item">
                            Documentation
                        </a>

                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                More
                            </a>

                            <div class="navbar-dropdown">
                                <a class="navbar-item">
                                    About
                                </a>
                                <a class="navbar-item">
                                    Jobs
                                </a>
                                <a class="navbar-item">
                                    Contact
                                </a>
                                <hr class="navbar-divider" />
                                <a class="navbar-item">
                                    Report an issue
                                 </a>
                            </div>
                        </div>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a class="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a class="button is-light">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="card-body">
                <Main />
                <Sticker />
                <Calendar />
            </div>
        </div>
    );
}
function httpReq() {
    const Http = new XMLHttpRequest();
    const url = 'https://vp9rxx6qx3.execute-api.us-east-1.amazonaws.com/prod/';
    Http.open("POST", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        const res = JSON.parse(Http.response);
        console.log(res);
        const imgs = res.Contents.map(img => img.Key.replace('yong/', ''));
        console.log(imgs);
    }
}

export default Navs;
