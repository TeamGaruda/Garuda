import React, { useState, useEffect } from "react";
import {
  getAllCategories,
  getAProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import Main from "../corefile/Main";
import AdminLeftSide from "../user/AdminLeftSide";
import { makeToast2 } from "../corefile/Toaster";

const UpdateProduct = ({ history,match }) => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    composition: "",
    uses: "",
    price: "",
    mrf: "",
    nooftablets: "",
    stock: "",
    photo: "",
    error: "",
    categories: [],
    category: "",
    loading: false,
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });
  const {
    name,
    composition,
    uses,
    price,
    nooftablets,
    stock,
    mrf,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getAProduct(productId).then((data) => {
      preloadCategories();
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          composition: data.composition,
          uses: data.uses,
          price: data.price,
          nooftablets: data.nooftablets,
          stock: data.stock,
          mrf: data.mrf,
          category: data.category.name,
          formData: new FormData(),
        });
      }
    });
  };
  const preloadCategories = () => {
    getAllCategories().then((data) => {
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };
  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, error: "" });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          makeToast2("success", "Product created successfully");
          makeToast2("success", "Category updated successfully", 2500);
          setTimeout(() => {
            history.push("/admin/products");
          }, 1200);
          setValues({
            ...values,
            name: "",
            composition: "",
            uses: "",
            price: "",
            mrf: "",
            nooftablets: "",
            stock: "",
            mrf: "",
            category: "",
            loading: "",
            formData: new FormData(),
            createdProduct: data.name,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const createProductForm = () => (
    <div className="card p-4">
      <form>
        <div className="form-group">
          <label className="btn btn-block btn-info">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            name="photo"
            className="form-control"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("composition")}
            name="photo"
            className="form-control"
            placeholder="Composition"
            value={composition}
          />
        </div>

        <div className="form-group">
          <input
            onChange={handleChange("mrf")}
            name="photo"
            className="form-control"
            placeholder="MRF"
            value={mrf}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange("uses")}
            name="photo"
            className="form-control"
            rows="5"
            placeholder="Uses"
            value={uses}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
          />
        </div>

        <div className="form-group">
          <input
            onChange={handleChange("nooftablets")}
            type="number"
            className="form-control"
            placeholder="No of tablets"
            value={nooftablets}
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
          >
            <option>Select</option>
            {categories &&
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={stock}
          />
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-block btn-outline-info my-3"
        >
          Update Product
        </button>
      </form>
    </div>
  );

  return (
    <Main>
      <div className="row w-100 m-0">
        <div className="col-3 p-5">
          <AdminLeftSide />
        </div>
        <div className="col-12 col-md-9 p-5 mt-1">
          <div className="row bg-white rounded">
            <div className="col-md-10">{createProductForm()}</div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default UpdateProduct;
