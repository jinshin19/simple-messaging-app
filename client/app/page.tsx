"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, seIsLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        router.replace("/dashboard");
      } catch (error) {
        console.log("Error found in home component", error);
        router.replace("/login");
      }
    };
    fetchData();
  }, []);
  return <div>Create a logic here if authenticated or not</div>;
}
