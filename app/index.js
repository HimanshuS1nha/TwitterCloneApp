import React, { useContext } from "react";
import { Redirect } from "expo-router";
import { AuthContext } from "../context";

const Index = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return;
  }
  if (Object.keys(user).length === 0) {
    return <Redirect href={"/login"} />;
  }
  return <Redirect href={"/home"} />;
};

export default Index;
