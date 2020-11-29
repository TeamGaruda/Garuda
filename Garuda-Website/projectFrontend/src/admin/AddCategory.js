import React, { useState } from "react";
import Main from "../corefile/Main";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";
import AdminLeftSide from "../user/AdminLeftSide";
import { makeToast2 } from "../corefile/Toaster";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { token, user } = isAuthenticated();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    //backend request fired
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          makeToast2("error", data.error, 2500);
        } else {
          makeToast2("success", "Category created successfully", 2500);
          setName("");
        }
      })
      .catch((err) => console.log(err));
  };

  const categoryForm = () => {
    return (
      <div className="card p-4">
        <form onSubmit={onSubmit}>
          <div className="form-group text-left">
            <p className="lead">Enter the Category</p>
            <input
              onChange={handleChange}
              value={name}
              type="text"
              className="form-control my-3"
              autofocus
              required
              placeholder="For e.g. medicine"
            />
            <button className="btn btn-outline-info">Create Category</button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-5">
            <AdminLeftSide />
          </div>
          <div className="col-12 col-md-9 p-5">
            <div className="row bg-white rounded">
              <div className="col-md-8">
                {error ? (
                  <h4 className="font-weight-bolder">No Orders placed yet</h4>
                ) : (
                  categoryForm()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default AddCategory;
