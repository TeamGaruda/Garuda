import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { API } from "../backend";
import { loadCart, cartEmpty, cartquantity } from "./helper/cartHelper";
import { cartamount } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import "./App.css";
import {  useHistory } from "react-router-dom";

export default function CheckoutForm({ address, coordinates }) {
  const [orderId, setOrderid] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [redirected, setRedirected] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const preload = () => {
    fetch(`${API}/stripepayment/secret`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(cartamount()),
        address: address,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.clientSecret);
        setClientSecret(data.clientSecret);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    preload();
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      console.log(loadCart());
      const orderData = {
        products: loadCart(),
        transaction_id: payload.paymentIntent.id,
        amount: (payload.paymentIntent.amount/100),
        quantity:(Number(cartquantity())),
        address: address,
        coordinates: coordinates,
        status: [{ statusname: "Received",updatetime:new Date() }],
      };
      createOrder(userId, token, orderData).then((data) => {
        setOrderid(data._id);
      });
      cartEmpty(() => {
        console.log("what happened");
      });
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setRedirected(true);
    }
  };

  const redirection = (orderId) => {
    if (redirected) {
      setTimeout(() => history.push("/user/order/" + orderId), 2200);
    }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {!succeeded && (
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
      )}
      {!succeeded && (
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay and Place order"
            )}
          </span>
        </button>
      )}
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <h4 className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, your orderid is <span className="text-danger">{orderId}</span>
        <br />
        Don't refresh the page we will redirect
      </h4>
      {redirection(orderId)}
    </form>
  );
}
