"use client";
import React from "react";

const Login = () => {
  const signin = async () => {
    console.log("You clicked the signin button");
  };

  return (
    <button type="button" onClick={signin}>
      Login
    </button>
  );
};

export default Login;
