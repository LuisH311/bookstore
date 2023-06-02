import React, { Component } from "react";

class aboutIt extends Component {
  render() {
    return (
      <>
        <a
          name="aboutIt"
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
            <div className="col-x1-4 col-lg-6 col-md-6 col-sm-7 col-xs-6">
              <p>
                <h1 className="display-5">Are you a book lover looking for a way to keep your books organized?</h1>
              </p>
            </div>
            <div className="col-x1-4 col-lg-6 col-md-6 col-sm-7 col-xs-6 mb-5 border border-success  border-3 text-bg-dark rounded-pill ">
              <p>
                <h1 className="display-3">Look no further!</h1>
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row  g-4">
          <div className="col-x1-4 col-lg-6 col-md-6 col-sm-7 col-xs-6">
              <div className="card text-center  border-info  text-bg-transparent ">
                <div className="card-header">Featured</div>
                <div className="card-body">
                  <p className="card-text lead mb-4 fw-semibold">
                   BookStore is the perfect solution for you. With its easy-to-use interface, you can manage your book collection and keep track of them.

                  </p>
                </div>
              </div>
            </div>
            <div className="col-x1-4 col-lg-6 col-md-6 col-sm-7 col-xs-6">
              <div className="card text-center  border-success   text-bg-transparent col-3">
                <div className="card-body">
                  <p className="card-text lead mb-4 fw-semibold">
                    Want to share your favorite books with other readers? BookStore makes it possible! You can add new books to your inventory and let other users enjoy them as well. In addition, you can edit or delete your books whenever you need to.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-x1-4 col-lg-7 col-md-6 col-sm-7 col-xs-6">
              <div className="card text-center  border-warning   text-bg-transparent col-3">
                <div className="card-body">
                  <p className="card-text lead mb-4 fw-semibold">
                  Interested in lending your books to others? "BookStore" has a bookmarking feature that allows you to indicate whether a book is available for loan or not.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center  border-dark  text-bg-transparent col-3">
                <div className="card-body">
                  <p className="card-text lead mb-4 fw-semibold">
                  And for those looking to discover new reads, "BookStore" shows you their entire inventory so you can choose the perfect book for you. And if you have any questions or need help, you can chat directly with the administrators.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
          <div className="row">
            <div className="col">
              <p>
                <h1 className="display-5">Don't wait any longer to organize your book collection and share your favorite stories with the world! Get "BookStore" today and discover how easy it is to manage your passion for reading!</h1>
              </p>
            </div>
          </div>
        </div>
        </div>
      </>
    );
  }
}

export default aboutIt;
