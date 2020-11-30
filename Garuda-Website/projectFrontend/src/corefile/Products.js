import React, { useState, useEffect } from "react";
import Main from "./Main";
import "./ProductComponents/product.css";
import ProductCard from "./ProductComponents/ProductCard";
import { getAllProducts } from "./helper/coreapicalls";
import { CircularProgress } from "@material-ui/core";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, [reload]);

  return (
    <Main>
      <div className="container mx-auto my-5 ">
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
              <CircularProgress color="primary" size="5rem" />
            </div>
          )}
          {!error &&
            products.length !== 0 &&
            products.map((product, index) => {
              return (
                <div className="col-12 mx-auto">
                  <ProductCard
                    product={product}
                    addtoCart={true}
                    removeFromCart={false}
                    key={index}
                    setReload={setReload}
                    reload={reload}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </Main>
  );
};

export default Products;
