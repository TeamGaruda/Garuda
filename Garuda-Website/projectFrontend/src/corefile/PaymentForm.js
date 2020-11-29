import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./App.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

export default function PaymentForm({ address, coordinates }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Elements stripe={stripePromise}>
            <CheckoutForm address={address} coordinates={coordinates} />
          </Elements>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
