import React, { useState } from "react";
import Main from "../corefile/Main";
import { isAuthenticated } from "../auth/helper";
import { updateCategory } from "./helper/adminapicall";
import AdminLeftSide from "../user/AdminLeftSide";
import { makeToast2 } from "../corefile/Toaster";

const UpdateCategory = ({ match,history}) => {
  const [name, setName] = useState("");

  const { token, user } = isAuthenticated();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (categoryId) => {
    //backend request fired
    updateCategory(categoryId, user._id, token, { name })
      .then((data) => {
        console.log(data);
        if (data.error) {
          makeToast2("error", data.error, 2500);
        } else {
          makeToast2("success", "Category updated successfully", 2500);
          setTimeout(() => {
            history.push("/admin/categories");
          }, 1200);
          setName("");
        }
      })
      .catch((err) => console.log(err));
  };

  const categoryForm = () => {
    return (
      <div className="card p-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(match.params.categoryId);
          }}
        >
          <div className="form-group text-left">
            <p className="lead">Enter the New Category Name</p>
            <input
              onChange={handleChange}
              value={name}
              type="text"
              className="form-control my-3"
              autofocus
              required
              placeholder="For e.g. medicine"
            />
            <button className="btn btn-outline-info">Update Category</button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Main>
      <div className="row w-100 m-0">
        <div className="col-3 p-5">
          <AdminLeftSide />
        </div>
        <div className="col-12 col-md-9 p-5 mt-2">
          <div className="row bg-white rounded">
            <div className="col-md-8">{categoryForm()}</div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default UpdateCategory;
