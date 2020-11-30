import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import comments from "./comments";

const ReviewsMobile = ({ visible }) => {

  return (
    <div>
      <section id="reviews" style={visible?{display:"none"}:{}}>
        <div
          id="review-slide"
          className="carousel slide"
          data-ride="carousel"
          data-interval="3000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container-fluid">
                <div className="row py-5 px-2">
                  <div className="col-12 col-md-4">
                    <CommentCard user={comments[0].one} />
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="container-fluid">
                <div className="row py-5 px-2">
                  <div className="col-12 col-md-4">
                    <CommentCard user={comments[0].two} />
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container-fluid">
                <div className="row py-5 px-2">
                  <div className="col-12 col-md-4">
                    <CommentCard user={comments[0].three} />
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container-fluid">
                <div className="row py-5 px-2">
                  <div className="col-12 col-md-4">
                    <CommentCard user={comments[1].one} />
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container-fluid">
                <div className="row py-5 px-2">
                  <div className="col-12 col-md-4">
                    <CommentCard user={comments[1].two} />
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container-fluid">
                <div className="row py-5 px-2">
                  <div className="col-12 col-md-4">
                    <CommentCard user={comments[1].three} />
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container-fluid">
                <div className="row py-5 px-2">
                  <div className="col-12 col-md-4">
                    <CommentCard user={comments[2].one} />
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container-fluid">
                <div className="row py-5 px-2">
                  <div className="col-12 col-md-4">
                    <CommentCard user={comments[2].two} />
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container-fluid">
                <div className="row py-5 px-2">
                  <div className="col-12 col-md-4">
                    <CommentCard user={comments[2].three} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#review-slide"
            role="button"
            data-slide="prev"
            style={{ color: "#1090a3" }}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#review-slide"
            role="button"
            data-slide="next"
            style={{ color: "#1090a3" }}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default ReviewsMobile;
