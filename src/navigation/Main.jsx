import React from "react";
import { LOCALSTORAGE } from "../constants";
import { MainAuthorized, MainNotAuthorized } from "../pages";
import { getDataFromLS } from "../store/localStorage";

const Main = () => {
  const token = getDataFromLS(LOCALSTORAGE.activeUser);
  const isLoggedIn = token?.token || null;
  return (
    isLoggedIn ? <MainAuthorized /> : <MainNotAuthorized />
  );
};

export default Main;
