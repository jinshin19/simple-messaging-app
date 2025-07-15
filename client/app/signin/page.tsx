"use client";
import Image from "next/image";
import React from "react";
import googleIcon from "../../public/google-iconv2.png";

const Signin = () => {
  const signin = async () => {
    console.log("You clicked the signin button");
  };

  return (
    <div className="signin-wrapper">
      <button type="button" onClick={signin}>
        <Image src={googleIcon} width={30} height={30} alt="Google Icon" /> Sign
        in with Google
      </button>
    </div>
  );
};

export default Signin;
