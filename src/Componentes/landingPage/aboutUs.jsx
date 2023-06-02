import React, { Component } from "react";
import img from "../../img/Luis.jpg";
import djimg from "../../img/diego.jpg";
import victorimg from "../../img/victor.jpg";

class aboutUs extends Component {
  render() {
    return (
      <>
        <a
          name="aboutUs"
          href="/#"
          style={{
            height: "1px",
            width: "1px",
            position: "absolute",
            overflow: "hidden",
          }}
        >
          .
        </a>
        <div className="container">
          <div className="row">
            <div className="col-x1-4 col-lg-7 col-md-7 col-sm-7 col-xs-6 ">
              <p>
                <h1>Meet our team</h1>
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center align-items-center p-4">
            <div
              className="col-x1-4 col-lg-3 col-md-4 col-sm-4 col-xs-6 me-3 mt-3 border"
              style={{ backgroundColor: "#EAEAEA" }}
            >
              <img
                className="card-img-top rounded-circle border"
                src={djimg}
                alt="fotito"
                draggable="false"
              />
              <div className="card-body mb-3">
                <h5 className="card-title">Diego Benavides</h5>
                <br />
                <i className="fa-xl"> Full Stack Developer</i>
              </div>
            </div>

            <div
              className="col-x1-4 col-lg-3 col-md-4 col-sm-4 col-xs-6 me-3 mt-3 border"
              style={{ backgroundColor: "#EAEAEA" }}
            >
              <img
                className="card-img-top rounded-circle border"
                src={victorimg}
                alt="fotito"
                draggable="false"
              />
              <div className="card-body mb-3">
                <h5 className="card-title">Victor Herrera</h5>
                <br />
                <i className="fa-xl"> BackEnd Developer </i>
              </div>
            </div>

            <div
              className="col-x1-4 col-lg-3 col-md-4 col-sm-4 col-xs-6 me-3 mt-3 border"
              style={{ backgroundColor: "#EAEAEA" }}
            >
              <img
                className="card-img-top rounded-circle border"
                src={img}
                alt="fotito"
                draggable="false"
              />
              <div className="card-body mb-3">
                <h5 className="card-title">Luis Hernandez</h5>
                <br />
                <i className="fa-xl"> FrontEnd Developer </i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default aboutUs;
