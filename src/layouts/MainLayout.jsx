import React, { useEffect } from "react";
import HeaderComponent from "../components/header/HeaderComponent";
import FooterComponent from "../components/footer/FooterComponent";
import { useDispatch } from "react-redux";
import { getUserByIdFetch } from "../core/services/userFetch";
import {
  getUserDetailsAction,
  signOutAction,
} from "../components/user/UserActions";

const MainLayout = (props) => {
  const { children } = props;
  const dispatch = useDispatch();

  // Handling token in localStorage (otherwise the session closes when refreshing the page)
  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (token && token !== "undefined" && token.trim() !== "") {
      getUserByIdFetch(token)
        .then((user) => {
          if (user) {
            dispatch(getUserDetailsAction(user));
          } else {
            throw new Error("No user returned");
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          dispatch(signOutAction());
        });
    }
  }, [dispatch]);

  return (
    <div>
      <HeaderComponent />
      <div>{children}</div>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
