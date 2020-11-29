const express=require("express");
const router=express.Router();
const {makepayment, getPaymentEvent,getSecret}=require("../controllers/stripepayment");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.post('/stripepayment/secret', getSecret);


module.exports=router;