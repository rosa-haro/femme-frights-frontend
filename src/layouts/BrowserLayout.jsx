import React from "react";
import BrowserComponent from "../components/browser/BrowserComponent";
import PagerComponent from "../components/browser/PagerComponent";
import { Outlet } from "react-router-dom";

const BrowserLayout = () => {
  return (
    <div>
      <BrowserComponent />
      <main>
        <Outlet />
      </main>
      <PagerComponent />
    </div>
  );
};

export default BrowserLayout;
