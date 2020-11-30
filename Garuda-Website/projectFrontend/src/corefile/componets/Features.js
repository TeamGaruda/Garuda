import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Features = () => {
  return (
    <>
      <section
        id="features"
        style={{ backgroundColor: "#17a2b8", color: "#ffffff" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="feature-box-left col-lg-4 p-3">
              <i className="feature-icon fas fa-check-circle fa-4x"></i>
              <h3 className="feature-title">Easy to use.</h3>
              <p>Easy access with zero perplexity.</p>
            </div>
            <div className="feature-box-right col-lg-4 p-3">
              <i class="fas fa-tachometer-alt fa-4x"></i>
              <h3 className="feature-title">Fast delivery (30min)</h3>
              <p>We have all the dogs, the greatest dogs.</p>
            </div>
            <div className="feature-box-left col-lg-4 p-3">
              <i class="fas fa-handshake-alt-slash fa-4x"></i>
              <h3 className="feature-title">No contact delivery</h3>
              <p>Find the love of your dog's life or your money back.</p>
            </div>
          </div>
          <div className="row">
            <div className="feature-box-right col-lg-5 offset-lg-1 py-3 px-1">
              <i className="fas fa-business-time fa-4x"></i>
              <h3>24/7</h3>
              <p>Your emergency is our priority.</p>
            </div>
            <div className="feature-box-left col-lg-5 p-3">
              <i className="fas fa-map-marked-alt fa-4x"></i>
              <h3 className="feature-title">Convenient Delivery</h3>
              <p>We have all the dogs, the greatest dogs.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
