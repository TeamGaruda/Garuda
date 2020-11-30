import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { loadCart, cartamount } from "./helper/cartHelper";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
    textAlign: "left",
  },
  muiListItemTextprimary: {
    textAlign: "left",
  },
}));

export default function Review({ coordinates, address }) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [amount,setAmount]=useState(0);

  useEffect(() => {
    setAmount(cartamount);
    setProducts(loadCart);
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem
            inputProps={{ style: { textAlign: "left" } }}
            className={classes.listItem}
            key={product.name}
          >
            <ListItemText
              className="text-left"
              primary={product.name}
              secondary={product.count}
            />
            <Typography
              inputProps={{ style: { textAlign: "left" } }}
              variant="body2"
            >
             Rs.{Number(product.price)*Number(product.count)}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            Rs.{cartamount().toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Billing Address
          </Typography>
          <Typography className="text-left" gutterBottom>
            Name:{address.name},
          </Typography>
          <Typography className="text-left" gutterBottom>
            {address.line1},<br/>{address.city},{address.state},{address.country},{" "}
            <br />
            {address.postal_code}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping Coordinates
          </Typography>
          <Typography className="text-left" gutterBottom>
            Lattitude:{coordinates.lat}
          </Typography>
          <Typography className="text-left" gutterBottom>
            Longitude:{coordinates.lng}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
