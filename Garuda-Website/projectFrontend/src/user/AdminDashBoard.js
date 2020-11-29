import React from "react";
import Main from "../corefile/Main";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import AdminLeftSide from "./AdminLeftSide";

const AdminDashBoard = ({ history }) => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header" style={{ fontWeight: "bold" }}>
          Profile Information
        </h4>
        <div className="card-body">
          <h6 class="card-title text-muted">
            <span className="badge badge-info mr-3 px-2 rounded-0">Name</span>
            {name}
          </h6>
          <h6 class="card-title text-muted">
            <span className="badge badge-info mr-3 px-2 rounded-0">Email</span>
            {email}
          </h6>
        </div>

        <h6 className="text-left mx-4 mt-0 mb-4">
          <span
            className="badge badge-danger text-left px-3 py-1"
            style={{ fontWeight: "bolder" }}
          >
            Admin Prevailage
          </span>
        </h6>
      </div>
    );
  };
  return (
    <Main>
      <div className="row w-100">
        <div className="col-md-3 p-5">
          <AdminLeftSide />
        </div>
        <div className="col-12 col-md-9 p-5 ">
          <div className="col-md-8 col-12">{adminRightSide()}</div>
        </div>
      </div>
    </Main>
  );
};

export default AdminDashBoard;
