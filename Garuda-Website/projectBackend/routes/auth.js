var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  signout,
  signup,
  signin,
  emailverify,
  isSignedIn,
  updatepassword,
  resetpassword,
} = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }).withMessage("name must be of length 3"),
    check("email", "please give an email").isEmail(),
  ],
  signup
);
router.post("/resetpassword", resetpassword);
router.post("/emailverify", emailverify);
router.post(
  "/updatepassword",
  [check("password", "password must be of length 3").isLength({ min: 3 })],
  updatepassword
);
router.get("/signout", signout);

router.post(
  "/signin",
  [
    check("email", "please give an email").isEmail(),
    check("password", "password field is required").isLength({ min: 1 }),
  ],
  signin
);

// router.get("/testroute",isSignedIn,(req,res)=>{
//     res.json(req.auth);
// }) section7 lecture6,7

module.exports = router;
