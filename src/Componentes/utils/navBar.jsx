import React, { Component } from "react";

class navBar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <i className="fa-solid fa-book-open-reader fa-xl" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav m-auto text-uppercase">
                <li className="nav-item ">
                  <a
                    className="nav-link active"
                    id="prueba1"
                    aria-current="page"
                    href="#aboutIt"
                  >
                    How it works
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#aboutUs" 
                  id="prueba2">
                    About the team
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contactUs"
                  id="prueba3">
                  Contact Us
                  </a>
                </li>
              </ul>
              <a
                className="btn btn-primary"
                id="logueo"
                role="button"
                aria-current="page"
                href="/login"
              >
                Login
              </a>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default navBar;
