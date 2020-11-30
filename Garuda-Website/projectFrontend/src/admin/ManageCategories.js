import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";
import Main from "../corefile/Main";
import AdminLeftSide from "../user/AdminLeftSide";
import { CircularProgress } from "@material-ui/core";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();
  const [error, setError] = useState("");

  const preLoad = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preLoad();
      }
    });
  };
  const manageCategory = () => {
    return (
      <div className="card">
        {categories.length == 0 && (
          <div className="container " style={{ minHeight: "18rem" }}>
            <CircularProgress color="primary" size="5rem" />
          </div>
        )}
        {categories.length !== 0 && (
          <div className="row">
            <div className="col-12">
              <div className="card-header">
                <h3 className=" card-title text-center text-info">
                  Total {categories.length} category
                </h3>
              </div>
              <div className="card-body p-0">
                <ul class="list-group">
                  {categories.map((category, index) => {
                    return (
                      <li class="list-group-item">
                        <div key={index} className="row text-center mb-2 ">
                          <div className="col-12 col-md-4">
                            <h5 className="text-info text-left font-weight-bolder">
                              {category.name}
                            </h5>
                          </div>
                          <div className="col-12 col-md-4">
                            <Link
                              className="btn btn-success btn-block m-1 btn-sm"
                              to={`/admin/category/update/${category._id}`}
                            >
                              <span className="">Update</span>
                            </Link>
                          </div>
                          <div className="col-12 col-md-4">
                            <button
                              onClick={() => {
                                deleteThisCategory(category._id);
                              }}
                              className="btn btn-danger btn-block m-1 btn-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Main>
      <div className="row w-100 m-0">
        <div className="col-3 p-5">
          <AdminLeftSide />
        </div>
        <div className="col-12 col-md-9 p-5 mt-1">
          <div className="row bg-white rounded">
            <div className="col-md-10">
              {error ? (
                <h4 className="font-weight-bolder">No Categories available</h4>
              ) : (
                manageCategory()
              )}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default ManageCategories;
