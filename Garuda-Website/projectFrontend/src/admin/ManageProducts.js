import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
import Main from "../corefile/Main";
import AdminLeftSide from "../user/AdminLeftSide";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();
  const [error, setError] = useState("");

  const preLoad = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const deleteThisProdduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        preLoad();
      }
    });
  };

  const manageProducts = () => {
    return (
      <div className="card w-100">
        <div className="card-header">
          <h3 className=" card-title text-center text-info">
            Total {products.length} products:
          </h3>
        </div>
        <div className="card-body p-0">
          <ul class="list-group">
            {products.map((product, index) => {
              return (
                <li class="list-group-item">
                  <div key={index} className="row text-center mb-2 ">
                    <div className="col-12 col-md-4">
                      <h5 className="font-weight-bold text-info text-left">
                        {product.name}
                      </h5>
                    </div>
                    <div className="col-12 col-md-4">
                      {product.stock > 0 ? (
                        <div>
                          <h5 className="font-weight-bold text-muted text-left">
                            Stock Available:{" "}
                            <span className="ml-2 text-danger">
                              {product.stock}
                            </span>
                          </h5>
                          <h5 className="font-weight-bold text-muted text-left">
                            Stock Sold:
                            <span className="ml-2 text-danger">
                              {product.sold}
                            </span>
                          </h5>
                        </div>
                      ) : (
                        <h5 className="font-weight-bold text-danger text-left">
                          Out Of Stock
                        </h5>
                      )}
                    </div>
                    <div className="col-12 col-md-4">
                      <Link
                        className="btn btn-success btn-block"
                        to={`/admin/product/update/${product._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                      <button
                        onClick={() => {
                          deleteThisProdduct(product._id);
                        }}
                        className="btn btn-danger btn-block"
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
    );
  };

  return (
    <Main>
      <div className="row w-100 m-0">
        <div className="col-3 p-5">
          <AdminLeftSide />
        </div>
        <div className="col-12 col-md-9 p-5 mt-1  w-auto">
          <div className="row bg-white rounded">
            <div className="col-md-11">
              {error ? (
                <h4 className="font-weight-bolder">No Products available</h4>
              ) : (
                manageProducts()
              )}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default ManageProducts;
