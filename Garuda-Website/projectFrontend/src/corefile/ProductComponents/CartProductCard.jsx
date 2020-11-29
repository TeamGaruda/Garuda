import React, { useState, useEffect } from "react";
import ImageHelper from "./ImageHelper";
import {
  loadCart,
  removeItemFromCart,
  updateItemInCart,
} from "../helper/cartHelper";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { makeToast1 } from "../Toaster";

const CartProductCard = ({ product, setReload, reload }) => {
  const productname = product ? product.name : "Loading...";
  const productcomposition = product ? product.composition : "Loading...";
  const productprice = product ? product.price : "Loading...";
  const productmrf = product ? product.mrf : "Loading...";
  const productnooftablets = product ? product.nooftablets : "Loading...";
  const [removeCart, setRemoveFromcart] = useState(true);
  const [updateCart, setUpdateCart] = useState(false);
  const [qty, setQty] = useState(product.count);

  const handleChange = (event) => {
    setRemoveFromcart(false);
    setUpdateCart(true);
    setQty(event.target.value);
  };

  return (
    <div class="card mb-3 productcard">
      <div class="row">
        <div class="col-md-3 p-2">
          <ImageHelper product={product} height="16rem" width="100%" />
        </div>
        <div class="col-md-9">
          <div className="card-body ">
            <div className="row">
              <div className="col-9 text-left">
                <h5 className="card-title d-inline">{productname}</h5>
              </div>
              <div className="col-3">
                <h5 className="card-title d-inline">Rs:.{productprice}</h5>
              </div>
            </div>
            <p class="card-text text-muted">
              <small>
                {productnooftablets > 1
                  ? productnooftablets + "Tablet(s) in a Strip"
                  : productnooftablets + "Units"}
              </small>
              <small class="text-muted">(MRF:&nbsp;{productmrf})</small>
            </p>
            <p class="card-text mt-3">
              <span className="subtitle pr-1"> Composition:</span>
              {productcomposition}
            </p>

            <div className="input-group mt-3">
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
                className="form-control"
                placeholder="1"
              />
            </div>
            {updateCart && (
              <button
                type="button"
                class="btn btn-success btn-block mt-4"
                onClick={() => {
                  setRemoveFromcart(true);
                  setUpdateCart(false);
                  product.count = qty;
                  updateItemInCart(product, () => {});
                  makeToast1(
                    "success",
                    `${product.name}'s quantity updated in cart`,
                    2000
                  );
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
                  removeItemFromCart(product._id);
                  makeToast1(
                    "success",
                    `${product.name} removed from cart`,
                    2000
                  );
                  setReload(!reload);
                }}
              >
                <RemoveShoppingCartIcon />
                &nbsp;&nbsp;&nbsp;Remove from cart
              </button>
            )}
          </div>
          <div className="text-right">
            <h5 class="card-text text-dark mb-4 d-inline ml-auto mr-4">
              Total Cost:{" "}
              <span className="pl-2">Rs.{(productprice * qty).toFixed(2)}</span>
              <br />
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
