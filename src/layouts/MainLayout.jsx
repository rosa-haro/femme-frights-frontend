import React from "react";
import HeaderComponent from "../components/header/HeaderComponent";
import FooterComponent from "../components/footer/FooterComponent";

const MainLayout = (props) => {
  const { children } = props;

  return (
    <div>
      <HeaderComponent />
      <div>{children}</div>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
