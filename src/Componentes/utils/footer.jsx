import React, { Component } from "react";
var date = new Date();

class footer extends Component {
  render() {
    return (
      <div>
      <footer className="footer bg-black text-white-50 text-lg-start">
        <div className="container text-center">
          <small>
            &copy;   {' '+date.getFullYear()} Copyright
          </small>
        </div>
      </footer>
    </div>
    );
  }
}

export default footer;
