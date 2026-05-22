import React from "react";
import Navbar from "../Components/HomePageComponents/Navbar";
import { Outlet } from "react-router";
import HomePage from "../Pagess/HomePage.jsx/HomePage";
import HeroSection from "../Components/HomePageComponents/HeroSection";
import Footer from "../Components/HomePageComponents/Footer";

const RootsLayout = () => {
  return (
    <div>
      <div>
        <div>
          <Navbar></Navbar>
          {/* <HeroSection></HeroSection> */}
          <Outlet>
            {/* <HomePage></HomePage> */}
          </Outlet>

          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default RootsLayout;
