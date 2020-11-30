import React from "react";
import { Link } from "react-router-dom";

const Videoexplain = () => {
  return (
    <>
      <section id="videoexplain">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6">
              <div
                className="embed-responsive embed-responsive-16by9 rounded-lg "
                id="video"
              >
                <iframe
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/cVzcSKcKJzM"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="col-12 col-md-6 video-text">
              <h1>How it works?</h1>
              <p>
                User's can order essential medical supplies through a very
                convenient and easy to website. All one has to do is log in onto
                the website, provide the delivery GPS coordinates and order the
                supplies they need.
              </p>
              <Link className="btn btn-outline-light mt-2" to="/about">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Videoexplain;
