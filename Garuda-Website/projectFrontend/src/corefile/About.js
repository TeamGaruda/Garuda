import React from "react";
import Main from "./Main";
import { Link } from "react-router-dom";
import image from "../images/problem.png";
import image1 from "../images/currscenario.png";
import image2 from "../images/dronetake.png";
import image3 from "../images/team.png";
import omkar from "../images/profiles/omkar.jpeg";
import sarthak from "../images/profiles/sarthak.jpg";
import debanshu from "../images/profiles/debanshu.jpeg";
import lunkesh from "../images/profiles/lunkesh.png";
import viseswar from "../images/profiles/viseswar.jpg";

const About = () => {
  return (
    <Main>
      <section id="about" style={{ color: "#6c63ff" }}>
        <div className="container-fluid about">
          <div className="row">
            <div className="col-12 col-md-6 about-page-text-right pt-5">
              <h1 className="text-muted">Problem</h1>
              <p style={{ fontSize: "20px" }}>
                The next best use of robotics and autonomous systems would be
                for the use of last mile delivery, it can be visualized in such
                a way where we can use autonomous aerial drones and terrestrial
                vehicles for the crucial last leg of the delivery system where
                it has to be delivered with the utmost safety and efficiency. As
                the result of the pandemic we have come to the realization that
                more and more commerce is going to be internet based and there
                is widening gap between the growth in the sector and the actual
                deliverability aspect of this unprecedented growth, so in order
                to solve these problems come up with solutions that are not only
                innovative but at the same time economically feasible.
              </p>
            </div>
            <div className="col-12 col-md-6 about-image">
              <img
                src={image}
                className="w-100 h-100 d-img"
                style={{}}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section id="about" style={{ color: "#6c63ff" }}>
        <div className="container-fluid about">
          <div className="row">
            <div className="col-12 col-md-6 about-image">
              <img src={image1} className="w-100 h-100 d-img" alt="" />
            </div>
            <div className="col-12 col-md-6 about-page-text-left  pt-5 mt-3">
              <h1 className="text-muted">Present Scenario</h1>
              <p style={{ fontSize: "20px" }}>
                In the current world the availability of proper healthcare
                facilities is very limited due to the improper maintenance of
                supply chains and the difficulty in delivering the required
                medicines to either remote inaccessible regions or dense urban
                environments where the use of conventional transport is not
                efficient enough as time is a very precious commodity in
                healthcare. So the medicines should be available at the exact
                time with the at most precision or else it won’t even make a
                difference at the end of the day. Even today many people die of
                diseases which can be prevented by proper medication but they
                don’t have access to these medicines at the time of need. So
                these supply chain facilities need to be made more efficient and
                updated with the latest technology available.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" style={{ color: "#6c63ff" }}>
        <div className="container-fluid about">
          <div className="row">
            <div className="col-12 col-md-6 about-page-text-right pt-5 mt-4">
              <h1 className="text-muted">Our solution</h1>
              <p style={{ fontSize: "20px" }}>
                The most viable solution we propose for the problem statement
                presented to us is the utilization of autonomous vertical
                takeoff and landing drones for the delivery of essential
                medicines and medical equipment to areas which are generally
                very difficult to access through most modes of transportation.
                This mode of delivery is not only the most efficient but the
                fastest as the drone can autonomously fly to the marked location
                via geo-positioning system coordinates and delivery the package.
              </p>
            </div>
            <div className="col-12 col-md-6 about-image">
              <img src={image2} className="w-100 h-100 d-img" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section id="about" style={{ color: "#6c63ff" }}>
        <div className="container-fluid about mt-5">
          <div className="row">
            <div className="col-12 col-md-6 about-image">
              <img src={image3} className="w-100 h-100 d-img" alt="" />
            </div>
            <div className="col-12 col-md-6 about-page-text-left mt-3">
              <h1 className="text-muted mb-5">Our Team</h1>
              <div className="row mb-4">
                <div className="col-md-4">
                  <img
                    src={sarthak}
                    className="rounded-circle h-75 w-75"
                    alt=""
                  />
                  <h5 className="font-weight-bold">Sarthak Saxena</h5>
                </div>
                <div className="col-md-4">
                  <img
                    src={lunkesh}
                    className="rounded-circle h-75 w-75"
                    alt=""
                  />
                  <h5 className="font-weight-bold">Lunkesh Ankamwar</h5>
                </div>
                <div className="col-md-4">
                  <img
                    src={viseswar}
                    className="rounded-circle h-75 w-75"
                    alt=""
                  />
                  <h5 className="font-weight-bold">Visweshwar Selvaraj</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 offset-2">
                  <img
                    src={omkar}
                    className="rounded-circle h-75 w-75"
                    alt=""
                  />
                  <h5 className="font-weight-bold">Omkar Sargar</h5>
                </div>
                <div className="col-md-4">
                  <img
                    src={debanshu}
                    className="rounded-circle h-75 w-75"
                    alt=""
                  />
                  <h5 className="font-weight-bold">Debanshu Rout</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default About;
