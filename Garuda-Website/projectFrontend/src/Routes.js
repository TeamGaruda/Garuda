import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./corefile/Home";
import Signup from "./user/Signup";
import Emailverify from "./user/Emailverify";
import Signin from "./user/Login";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import ManageCategories from "./admin/ManageCategories";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./corefile/Cart";
import Resetpassword from "./user/Resetpassword";
import ManageOrders from "./admin/ManageOrders";
import CheckOutPage from "./corefile/CheckOutPage";
import Success from "./user/Success";
import Products from "./corefile/Products";
import About from "./corefile/About";
import ProductsCategory from "./corefile/ProductsCategory";
import Orders from "./user/Orders";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/resetpassword" exact component={Resetpassword}></Route>
        <Route
          path="/emailverify/:tokenId"
          exact
          component={Emailverify}
        ></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/products" exact component={Products}></Route>
        <Route path="/about" exact component={About}></Route>
        <Route
          path="/products/:cateId/:cateName"
          exact
          component={ProductsCategory}
        ></Route>
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute path="/checkout" exact component={CheckOutPage} />
        <PrivateRoute path="/user/order/:orderId" exact component={Success} />
        <PrivateRoute path="/user/order" exact component={Orders} />


        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/orders" exact component={ManageOrders} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
        <Route path="/cart" exact component={Cart}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
