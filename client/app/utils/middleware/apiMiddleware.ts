import { getCookie } from "../helpers/cookie.helper";

export const apiMiddleware = async ({
  url,
  options,
}: {
  url: string;
  options: RequestInit;
}) => {
  try {
    const baseURl = "http://localhost:3001/api";
    const accessToken = getCookie("SMA-accessToken");

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

    const isSignInPage = window.location.href;

    if (response.status === 401 && !isSignInPage.includes("/signin")) {
      window.location.href = "/signin";
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.stack);
    } else {
      throw new Error(error as any);
    }
  }
};
