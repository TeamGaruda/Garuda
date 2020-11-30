import React from "react";
import { Link,withRouter } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";


const AdminLeftSide = ({history}) => {
const matches = useMediaQuery("(min-width:600px)");

  const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "blue" };
    } else {
      return { color: "rgb(43, 70, 139)" };
    }
  };

  const leftsidecontent=(history)=>{
    return(
      <div className="card">
      <h5 className="card-header bg-info text-white font-weight-bold">
        Site Management
      </h5>
      <div class="btn-group-vertical">
        <Link
          to="/admin/create/category"
          className="btn btn-light p-3"
          style={currentTab(history, "/admin/create/category")}
        >
          {" "}
          Create Categories
        </Link>
        <Link
          to="/admin/categories"
          className="btn btn-light p-3"
          style={currentTab(history, "/admin/categories")}
        >
          {" "}
          Manage Categories
        </Link>
        <Link
          to="/admin/create/product"
          className="btn btn-light p-3"
          style={currentTab(history, "/admin/create/product")}
        >
          {" "}
          Create Product
        </Link>
        <Link
          to="/admin/products"
          className="btn btn-light p-3"
          style={currentTab(history, "/admin/products")}
        >
          {" "}
          Manage Products
        </Link>
        <Link
          to="/admin/orders"
          className="btn btn-light p-3"
          style={currentTab(history, "/admin/orders")}
        >
          {" "}
          Manage Orders
        </Link>
      </div>
    </div>
    );
  }
  return (
   <>
     {matches&&leftsidecontent(history)}
   </>
  );
};

export default withRouter(AdminLeftSide);
