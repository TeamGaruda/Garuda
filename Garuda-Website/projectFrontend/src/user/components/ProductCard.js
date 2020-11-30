import React, { useState, useEffect } from "react";
import ImageHelper from "./ImageHelper";
import {
  loadCart,
  addItemToCart,
  removeItemFromCart,
  updateItemInCart,
} from "../helper/cartHelper";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { makeToast1} from "../Toaster";

const ProductCard = ({ product, setReload, reload }) => {
  const productname = product ? product.name : "Loading...";
  const productcomposition = product ? product.composition : "Loading...";
  const productuses = product ? product.uses : "Loading...";
  const productprice = product ? product.price : "Loading...";
  const productmrf = product ? product.mrf : "Loading...";
  const productnooftablets = product ? product.nooftablets : "Loading...";
  const [addCart, setAddtocart] = useState(true);
  const [removeCart, setRemoveFromcart] = useState(false);
  const [updateCart, setUpdateCart] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    loadCart().map((p) => {
      if (p._id === product._id) {
        setAddtocart(false);
        setRemoveFromcart(true);
        setUpdateCart(false);
        setQty(p.count);
      }
    });
  }, []);

  const handleChange = (event) => {
    if (addCart) {
      setQty(event.target.value);
    } else {
      setRemoveFromcart(false);
      setUpdateCart(true);
      setQty(event.target.value);
    }
  };

  return (
    <div class="card mb-3 productcard">
      <div class="row">
        <div class="col-md-3">
          <ImageHelper product={product} height="15rem" width="100%" />
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h5 class="card-title">{productname}</h5>
            <p class="card-text text-muted">
              <span className="subtitle pr-1"> composition:</span>{" "}
              {productcomposition}
            </p>
            <p class="card-text">
              <span className="subtitle pr-2">Uses:</span>
              {productuses}
            </p>
            <p class="card-text">
              <small>
                {" "}
                {productnooftablets > 1
                  ? productnooftablets + "Tablet(s) in a Strip"
                  : productnooftablets + "Units"}{" "}
              </small>{" "}
              <br />
              <small class="text-muted">{productmrf}</small>
            </p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card-body">
            <h5 class="card-title text-dark">
              M.R.P.: <span className="price pl-2">Rs.{productprice}</span>
            </h5>
            <h6 class="card-text text-dark mt-2">
              Total Cost:{" "}
              <span className="pl-2">Rs.{(productprice * qty).toFixed(2)}</span>
            </h6>
            <div className="input-group mt-5">
              <div className="input-group-prepend">
                <span class="input-group-text" style={{ fontSize: "0.8rem" }}>
                  Quantity:
                </span>
              </div>
              <input
                type="number"
                min="1"
                name="quantity"
                value={qty}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="form-control w-25"
                placeholder="1"
              />
            </div>
            {addCart && (
              <button
                type="button"
                onClick={() => {
                  setAddtocart(false);
                  setRemoveFromcart(true);
                  product.count = qty;
                  addItemToCart(product, () => {
                    makeToast1("success", `${product.name} added to cart`,2000);
                  });
                  setReload(!reload);
                }}
                class="btn btn-primary btn-block mt-4"
              >
                <AddShoppingCartIcon />
                &nbsp;&nbsp;&nbsp;Add to cart
              </button>
            )}
            {updateCart && (
              <button
                type="button"
                class="btn btn-success btn-block mt-4"
                onClick={() => {
                  setAddtocart(false);
                  setRemoveFromcart(true);
                  setUpdateCart(false);
                  product.count = qty;
                  updateItemInCart(product, () => {});
                  makeToast1("success", `${product.name}'s quantity updated in cart`,2000);
                  setReload(!reload);
                }}
              >
                <ArrowUpwardIcon />
                &nbsp;&nbsp;&nbsp;Update cart
              </button>
            )}
            {removeCart && (
              <button
                type="button"
                class="btn btn-danger btn-block mt-4"
                onClick={() => {
                  setAddtocart(true);
                  setRemoveFromcart(false);
                  removeItemFromCart(product._id);
                  makeToast1("success", `${product.name} removed from cart`,2000);
                  setReload(!reload);
                }}
              >
                <RemoveShoppingCartIcon />
                &nbsp;&nbsp;&nbsp;Remove from cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
