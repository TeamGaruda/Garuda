import React, { Children } from "react";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import "./core.css";

const Main = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Main;
