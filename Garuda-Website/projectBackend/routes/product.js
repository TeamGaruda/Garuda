const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
  getProductsByCategory,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { getCategoryById } = require("../controllers/category");

//all params
router.param("userId", getUserById);
router.param("productId", getProductById);
router.param("categoryId", getCategoryById);

//all of actual routes

//CREATE
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
//READ
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//UPDATE
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);
//DELETE
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//LISTING ROUTE (to show data in home page all product)
router.get("/products", getAllProducts);
router.get("/products/category/:categoryId", getProductsByCategory);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
