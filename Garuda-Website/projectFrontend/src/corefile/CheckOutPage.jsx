import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Logo from "../images/drone (2).png";
import GetLocation from "./GetLocation";
import { makeToast2 } from "./Toaster";
import { cartquantity } from "./helper/cartHelper";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Garuda
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    display: "block",
    fontFamily: "Ubuntu",
    fontSize: "1.5rem",
    color: "rgb(43,70,139)",
  },
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 0),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = [
  "Billing Address",
  "Get Location",
  "Review Order",
  "Payment Details",
];

function getStepContent(
  step,
  setAddress,
  address,
  setCoordinates,
  coordinates
) {
  switch (step) {
    case 0:
      return <AddressForm setAddress={setAddress} address={address} />;
    case 1:
      return <GetLocation setCoordinates={setCoordinates} />;
    case 2:
      return <Review coordinates={coordinates} address={address} />;
    case 3:
      return <PaymentForm coordinates={coordinates} address={address} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function CheckOutPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [address, setAddress] = React.useState({
    name: "",
    line1: "",
    line2: "",
    postal_code: "",
    city: "",
    state: "",
    country: "India",
  });
  const [coordinates, setCoordinates] = React.useState({});

  const handleNext = () => {
    if (
      address.name === "" ||
      address.line1 === "" ||
      address.postal_code === "" ||
      address.country === "" ||
      address.city === ""
    ) {
      makeToast2("error", "Please fill all the required field", 2000);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <img src={Logo} alt="logo" />
          <Typography className={classes.title} variant="h6" noWrap>
            GARUDA
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        {cartquantity() !== 0 ? (
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label} className={classes.eachstep} alternativeLabel>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(
                    activeStep,
                    setAddress,
                    address,
                    setCoordinates,
                    coordinates
                  )}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    {activeStep !== steps.length - 1 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        ) : (
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              Sorry no item to pay
            </Typography>
          </Paper>
        )}
        <Copyright />
      </main>
    </React.Fragment>
  );
}
