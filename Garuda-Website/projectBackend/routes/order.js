const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const {
  getOderById,
  createOrder,
  getAllorders,
  getAOrder,
  getOrderStatus,
  updateStatus,
  getAllordersOfUser,
} = require("../controllers/order");

//params
router.param("userId", getUserById);
router.param("oderId", getOderById);

//Actual routes
//CREATE
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

//READ
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllorders
);
router.get("/order/:userId/:oderId", isSignedIn, isAuthenticated, getAOrder);
router.get("/order/:userId", isSignedIn, isAuthenticated, getAllordersOfUser);

//status of order
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
