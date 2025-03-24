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
  const loadUserDetails = async () => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined" || token.trim() === "") {
      dispatch(signOutAction());
      localStorage.removeItem("token");
      return;
    }

    try {
      const auxUser = await getUserByIdFetch(token);
      if (!auxUser) throw new Error("User not found");

      dispatch(getUserDetailsAction(auxUser));
    } catch (error) {
      dispatch(signOutAction());
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    loadUserDetails();
  }, []);

  return (
    <div>
      <HeaderComponent />
      <div>{children}</div>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
