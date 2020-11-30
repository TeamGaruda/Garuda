import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import Main from "./Main";
import "./ProductComponents/product.css";
import ProductCard from "./ProductComponents/ProductCard";
import { getCategoryProducts } from "./helper/coreapicalls";
import { CircularProgress } from "@material-ui/core";

const ProductsCategory = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  const loadAllProducts = () => {
    getCategoryProducts(match.params.cateId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, [reload, match.params.cateId]);

  return (
    <Main>
      <div className="container mx-auto my-5 ">
        <Breadcrumbs aria-label="breadcrumb" className="my-4">
          <Link color="inherit" to="/products">
            All
          </Link>
          <Typography color="inherit">{match.params.cateName}</Typography>
        </Breadcrumbs>
        <div className="row">
          {error && (
            <div className="container " style={{ minHeight: "18rem" }}>
              <h3 className="" style={{ padding: "10vh 0rem 0" }}>
                some error occure <br />
                Please contact admin <br />
              </h3>
            </div>
          )}
          {products.length === 0 && (
            <div className="container " style={{ minHeight: "18rem" }}>
              <CircularProgress color="primary"  size="5rem" />
            </div>
          )}
          {!error &&
            products.length !== 0 &&
            products.map((product, index) => {
              return (
                <div key={index} className="col-12 mx-auto">
                  <ProductCard
                    product={product}
                    setReload={setReload}
                    reload={reload}
                  />
                </div>
              );
            })}
          <div className="col-12"></div>
        </div>
      </div>
    </Main>
  );
};

export default ProductsCategory;
