"use client";
import { ReactNode, useEffect, useState } from "react";
import { validateAuthorization } from "./utils/apis/validateApi";
import { usePathname, useRouter } from "next/navigation";

const Wrapper = ({ children }: { children: ReactNode }) => {
  const path = usePathname();

  console.log("path", path);
  const allowedPaths = ["/", "/dashboard", "/conversations"];
  const notAllowedPaths = ["/signin"];
  const isAllowed = allowedPaths.some(
    (allowed) => path === allowed || path.startsWith(`${allowed}/`)
  );
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await validateAuthorization();

        if (response.status === 401) {
          if (isAllowed) {
            router.replace("/signin");
          }
        } else {
          if (notAllowedPaths.includes(path)) {
            router.replace("/");
          }
        }
      } catch (error) {
        console.log("Error found", {
          file_path: "wrapper.tsx",
          error,
        });
        throw new Error("Something went wrong");
      }
    };
    fetchData();
  }, [path]);

  return children;
};

export default Wrapper;
