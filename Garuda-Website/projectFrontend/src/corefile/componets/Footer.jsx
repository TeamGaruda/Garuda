import React from "react";

const Footer = () => {
  return (
    <>
      <section id="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-4 footer-text">
              <h4>Our Address:</h4>
              <p>
                Garuda Delivery Services Private Limited, Buildings Alyssa,
                Begonia & Clove Embassy Tech Village, Outer Ring Road,
                Devarabeesanahalli Village, Bengaluru, 560103, Karnataka, India
                CIN : U51109KA2012PTC066107 Telephone: 1800 208 9898
              </p>
              <br />
              <h4>Mail us at:</h4>
              <a href="mailto:debanshu78@gmail.com">
                contact_teamgaruda@garuda.com
              </a>
            </div>
            <div className="col-12 col-md-3 footer-map pr-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.0958073556244!2d85.8283939143955!3d20.296301117755164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909cea55d0ecf%3A0x8ae213e406a3b794!2sTheTechPoint!5e0!3m2!1sen!2sin!4v1605364154132!5m2!1sen!2sin"
                frameborder="0"
                className="border-0 rounded"
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </div>
            <hr className="verticalrow" />
            <div className="col-12 col-md-4 newsletter rounded">
              <h5>Stay up to dated by sign up our news letter:</h5>
              <form>
                <div className="form-group input-text-control p-1">
                  <i class="fas fa-envelope fa-lg mx-2 my-3"></i>
                  <input
                    type="email"
                    name="email"
                    id=""
                    placeholder="Enter your email here"
                    className="input-text form-controll p-2"
                  />
                </div>
                <button className="btn btn-danger btn-block ">
                  Sign up to Newsletter
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section id="footer-social">
        <div className="container-fluid">
          <div className="row p-3">
            <div className="col-12 col-md-5 offset-md-4">
              <i class="footer-icon fab fa-lg fa-youtube mx-2"></i>
              <i class="footer-icon fab fa-lg fa-github mx-2"></i>
              <i class="footer-icon fas fa-lg fa-envelope mx-2"></i>
              <p className="mx-3">© Copyrights {new Date().getFullYear()} GARUDA</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
