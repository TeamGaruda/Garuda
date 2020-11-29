const User = require("../models/user"); //on what name we export userSchema that name is recommended to give this const
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const uuidv1 = require("uuid/v1");

const send_email = (to, sms, next) => {
  const msg = {
    to: `${to}`, // Change to your recipient
    from: "contact.teamgaruda@gmail.com", // Change to your verified sender
    subject: "Email verification from MedDrone",
    text: `http://localhost:3000/${sms}`,
    html: `<strong>Please visit this to verify your account <br> http://localhost:3000/emailverify/${sms} </strong>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      next();
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.set("verify.token", uuidv1());
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        err: "Not able to save user to DB",
        error: "User already exist",
      });
    }
    send_email(user.email, user.verify.token, () => {
      res.json({
        name: user.name,
        email: user.email,
        id: user._id,
      });
    });
  });
};

exports.resetpassword = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email not exist",
      });
    }
    console.log(user);
    user.accountstatus = "reset";
    user.verify.token = uuidv1();
    user.verify.liveto = new Date(+new Date() + 24 * 60 * 60 * 1000);
    user.save((error, updateduser) => {
      if (error) {
        return res.status(400).json({
          err: "Not able to save user to DB",
          error: error,
        });
      }
      console.log(updateduser);
      send_email(user.email, user.verify.token, () => {
        res.json({
          name: user.name,
          email: user.email,
          id: user._id,
        });
      });
    });
  });
};

exports.emailverify = (req, res) => {
  var { token } = req.body;

  User.findOne({ "verify.token": token }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Link not exist",
      });
    }
    if (new Date() > user.verify.liveto) {
      user.verify.token = "";
      user.save((error, updateduser) => {
        if (error || !updateduser) {
          return res.status(400).json({
            error: "Not able to save user to DB",
            err: error,
          });
        }
      });
      return res.status(400).json({
        error: "Link not exist",
      });
    }
    res.json({ name: user.name });
  });
};

exports.updatepassword = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  var { token, password } = req.body;
  User.findOne({ "verify.token": token }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Link not exist",
      });
    }
    user.password = password;
    user.accountstatus = "active";
    user.verify.token = "";
    user.save((error, updateduser) => {
      if (error) {
        return res.status(400).json({
          err: "Not able to save user to DB",
          error: error,
        });
      }
      updateduser.salt = undefined; //it hide the field
      updateduser.encry_password = undefined;
      updateduser.updatedAt = undefined;
      updateduser.createdAt = undefined;
      res.json(updateduser);
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email not exists",
      });
    }
    if (user.accountstatus === "deactive") {
      return res.status(400).json({
        error: "Your account is not verified",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRETE);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to frontend
    const { _id, name, email, role, createdAt } = user;
    return res.json({ token, user: { _id, name, email, role, createdAt } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout successfully",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRETE,
  requestProperty: "auth",
});

//custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "ADMIN ACCESS DENIED",
    });
  }
  next();
};
