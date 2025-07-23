import { RequestInit } from "next/dist/server/web/spec-extension/request";

export const apiMiddleware = async ({
  url,
  options,
}: {
  url: string;
  options: RequestInit;
}) => {
  try {
    const baseURl = "http://localhost:3001/api";
    const accessToken = localStorage.getItem("accessToken");

    options = {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    };

    const response = await fetch(`${baseURl}${url}`, {
      ...options,
      headers: {
        ...options.headers,
      },
      credentials: "include",
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.stack);
    } else {
      throw new Error(error as any);
    }
  }
};
