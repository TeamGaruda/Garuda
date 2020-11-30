import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function AddressForm({ setAddress, address }) {
  const handleChange = (name) => (event) => {
    setAddress({ ...address, [name]: event.target.value });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Billinging Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            inputProps={{ style: { textAlign: "left" } }}
            required
            id="name"
            name="name"
            label="Full Name"
            value={address.name}
            onChange={handleChange("name")}
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputProps={{ style: { textAlign: "left" } }}
            required
            id="address1"
            name="address1"
            onChange={handleChange("line1")}
            value={address.line1}
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputProps={{ style: { textAlign: "left" } }}
            id="address2"
            name="address2"
            label="Address line 2"
            onChange={handleChange("line2")}
            value={address.line2}
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            inputProps={{ style: { textAlign: "left" } }}
            required
            id="city"
            name="city"
            label="City"
            onChange={handleChange("city")}
            value={address.city}
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            inputProps={{ style: { textAlign: "left" } }}
            id="state"
            name="state"
            onChange={handleChange("state")}
            value={address.state}
            label="State/Province/Region"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            inputProps={{ style: { textAlign: "left" } }}
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            onChange={handleChange("postal_code")}
            value={address.postal_code}
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            inputProps={{ style: { textAlign: "left" } }}
            required
            id="country"
            name="country"
            label="Country"
            value={address.country}
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
