"use client";
import { useState } from "react";
import Dashboard from "./dashboard/page";
import Signin from "./signin/page";
import Wrapper from "./wrapper";

export default function Page() {
  const [authenticated, setAuthenticated] = useState(false);
  // return (
  //   <Wrapper>
  //     <Signin />
  //   </Wrapper>
  // );
  return "hello";
}
