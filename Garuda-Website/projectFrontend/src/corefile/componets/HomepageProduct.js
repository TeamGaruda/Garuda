import React from "react";
import firstaid2 from "../../images/firstaidkit2.png";
import { Link } from "react-router-dom";

const HomepageProduct = () => {
  return (
    <>
      <section id="homepageproduct" style={{ color: "#17a2b8" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-7 homepageproduct-text">
              <h1>Essential Products</h1>
              <p>
                Medications to which people should have access at all times in sufficient amounts.Plasma,Blood,Anti-Venoms are available in our website to serve any kind of emergency situation in minutes.Covid Essentials like sanitizer,ppekit,gloves,masks etc are also available to fight the pandemic.
              </p>
              <Link className="btn btn-outline-info" to="/products">
                Browse Products
              </Link>
            </div>
            <div className="col-12 col-md-5 homepageproduct-image">
              <img
                src={firstaid2}
                className="firstaid w-100 h-100"
                style={{}}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomepageProduct;
