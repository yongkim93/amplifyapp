import React from 'react';
import './Navs.scss';
import Main from '../main/Main';
import Sticker from '../sticker/Sticker';
import Calendar from '../calendar/Calendar';

function Navs() {
    return (
        <div className="card text-center">
            <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={httpReq}>Photos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Bio</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Blog</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Contact</a>
                    </li>
                </ul>
            </div>
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
