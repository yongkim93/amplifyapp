import React, { useEffect } from "react";
import "./Navs.scss";
import Main from "../main/Main";
import Sticker from "../sticker/Sticker";
import Calendar from "../calendar/Calendar";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import DragAndCreate from "../drag-and-create/DragAndCreate";
import VerticalGrid from "../responsive-grid/VerticalGrid";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GoogleLoginButton from "../google-login/GoogleLoginButton";
import GoogleLogoutButton from "../google-login/GoogleLogoutButton";

function Navs() {
  function Home() {
    return <h2>Home</h2>;
  }

  function About() {
    return <h2>About</h2>;
  }

  function Users() {
    return <h2>Users</h2>;
  }
  function refresh(){
    window.location.href = "http://localhost:3000/VerticalGrid";
  }

  return (
    <div className="card text-center">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              Home
            </Link>

              <Link className="navbar-item" to="/appointment">
                Appointment
              </Link>
              <Link className="navbar-item" to="/DragAndDrop">
                Drag-And-Drop
              </Link>
              <Link className="navbar-item" to="/DragAndCreate">
                Drag-And-Create
              </Link>
              <Link className="navbar-item" to="" onClick={refresh}>
                Grid
              </Link>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <GoogleLoginButton />
                <GoogleLogoutButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
function httpReq() {
  const Http = new XMLHttpRequest();
  const url = "https://vp9rxx6qx3.execute-api.us-east-1.amazonaws.com/prod/";
  Http.open("POST", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    const res = JSON.parse(Http.response);
    console.log(res);
    const imgs = res.Contents.map((img) => img.Key.replace("yong/", ""));
    console.log(imgs);
  };
}

export default Navs;
