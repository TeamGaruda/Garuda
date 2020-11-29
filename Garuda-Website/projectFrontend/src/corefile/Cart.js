import React, { useState, useEffect } from "react";
import Main from "./Main";
import { loadCart, cartamount, cartquantity } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import CartProductCard from "./ProductComponents/CartProductCard";
import "./ProductComponents/product.css";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart);
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div className="container-fluid my-5">
        <div className="row">
          {products.map((product, index) => {
            return (
              <div className="col-12 mb-4">
                <CartProductCard
                  product={product}
                  reload={reload}
                  setReload={setReload}
                  key={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Main>
      <div className="row text-center m-0">
        {products !== undefined && products.length > 0 ? (
          <>
            <div className="col-12 col-md-7 cart-cards">
              <h3
                className="text-left pt-5 pl-3 text-muted"
                style={{ fontWeight: "bolder" }}
              >
                Cart Items&nbsp;&nbsp;:
              </h3>
              {loadAllProducts(products)}
            </div>
            <div className="col-12 col-md-4 ">
              <div className="container">
                <div className="card my-5 w-100 price-details">
                  <div className="card-header bg-info text-light">
                    <h4 className="card-title">Price Details:</h4>
                  </div>
                  <div className="card-body">
                    <h5 className="card-subtitle text-left text-muted py-1">
                      Total no of items :&nbsp;&nbsp;&nbsp;{" "}
                      <span className="text-dark"> {cartquantity()} </span>
                    </h5>
                    <h5 className="card-text text-muted py-1">
                      Total cost :&nbsp;&nbsp;&nbsp;{" "}
                      <span className="text-dark">
                        {" "}
                        Rs.{cartamount().toFixed(2)}
                      </span>
                    </h5>
                    <Link
                      className="btn btn-block btn-success mb-3 mt-4"
                      to="/checkout"
                    >
                      Place Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container" style={{ minHeight: "18rem" }}>
            <h3 className="" style={{ padding: "10vh 0rem 0" }}>
              No products available in cart <br />
              Please add some product <br />
            </h3>
            <Link className="btn btn-info " to="/products">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </Main>
  );
}
