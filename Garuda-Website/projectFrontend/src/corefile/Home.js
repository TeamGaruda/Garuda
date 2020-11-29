import React from "react";
import Header from "./componets/Header";
import "./core.css";
import Features from "./componets/Features";
import Reviews from "./componets/Reviews";
import Videoexplain from "./componets/Videoexplain";
import ReviewsMobile from "./componets/ReviewsMobile";
import HomepageProduct from "./componets/HomepageProduct";
import Main from "./Main";

export default function Home() {
  return (
    <Main>
      <Header />
      <Features />
      <HomepageProduct />
      <Videoexplain />
      <Reviews visible={window.innerWidth < 600} />
      <ReviewsMobile visible={window.innerWidth > 601} />
    </Main>
  );
}
