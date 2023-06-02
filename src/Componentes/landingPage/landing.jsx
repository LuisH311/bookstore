import React, { Component } from "react";
import NavBar from "../utils/navBar";
import AboutUs from "./aboutUs";
import AboutIt from "./aboutIt";
import Footer from "../utils/footer";
import ContactUs from "./contactUs";

class landing extends Component {
  render() {
    return (
      <>
        <header className="header">
          <NavBar />
          <div className="container-xxl bd-gutter mt-5">
            <div className="col-md-8 mx-auto text-center">
              <h1 className="position-absolute top-50 start-50 translate-middle mb-5 fw-bold display-1">
                <i className="fa-solid fa-book-open-reader fa-beat-fade fa-xl"></i>
                <i className="fa-xl"> Book Store </i>
              </h1>
            </div>
          </div>
        </header>
        <br />
        <AboutIt />
        <AboutUs />
        <ContactUs />
        <Footer />
      </>
    );
  }
}

export default landing;
