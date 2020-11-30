import React from "react";
import { Link } from "react-router-dom";
import one from "../../images/1.jpg";
import five from "../../images/5.jpg";
import six from "../../images/6.jpg";
import seven from "../../images/7.jpg";
const Header = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5  header-text-div">
            <h2 className="big-heading">Lets stepped</h2>
            <h2 style={{ color: "#000000" }} className="big-heading">
              into
            </h2>
            <h2 className="big-heading">A new world of revolution</h2>
            <Link className="btn btn-info px-3 mx-3 mt-3" to={"/signin"}>
              Sign In
            </Link>
            <Link
              className="btn btn-outline-dark px-3 mx-3 mt-3"
              to={"/signup"}
            >
              Sign Up
            </Link>
          </div>
          <div className="col-md-7 header-img-div mt-4 ">
            <div
              className="carousel slide"
              data-ride="carousel"
              data-interval="2000"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={seven} alt="one" className="img-fluid one" />
                </div>
                <div className="carousel-item">
                  <img src={six} alt="one" className="img-fluid one" />
                </div>
                <div className="carousel-item">
                  <img src={one} alt="one" className="img-fluid one" />
                </div>
                <div className="carousel-item">
                  <img src={five} alt="one" className="img-fluid one" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
