import { getCookie } from "./cookie.helper";
import { extractedTokenData } from "./token.helper";

export const tokenChecker = ({
  queryToken = null,
}: tokenCheckerParameterI): objectReturnI => {
  const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  const tokenInCookieStorage = getCookie("SMA-accessToken");
  if (
    !tokenInCookieStorage ||
    tokenInCookieStorage?.length > 0 ||
    tokenInCookieStorage !== "null"
  ) {
    localStorage.setItem("SMA-accessToken", tokenInCookieStorage!);
  }
  const tokenInLocalStorage = localStorage.getItem("SMA-accessToken");
  const token =
    tokenInLocalStorage === "null"
      ? null
      : tokenInLocalStorage || tokenInCookieStorage;

  const isTokenValid = (tokenParam: string) => jwtRegex.test(tokenParam);

  console.log("TOKENECHECKER", token);

  const setDataInLocalStorage = (token: string) => {
    const extractedTokenDataResult = extractedTokenData(token);

    localStorage.setItem(
      "SMA-user_id",
      extractedTokenDataResult?.user_id as string
    );
    localStorage.setItem(
      "SMA-given_name",
      extractedTokenDataResult?.given_name as string
    );
    localStorage.setItem(
      "SMA-family_name",
      extractedTokenDataResult?.family_name as string
    );
    localStorage.setItem(
      "SMA-picture",
      extractedTokenDataResult?.picture as string
    );
  };

  if (!queryToken && !token) {
    return {
      hasToken: false,
      token: null,
    };
  } else {
    const isValid = isTokenValid(token!);
    if (isValid) {
      setDataInLocalStorage(token!);
    }
    if (!queryToken && token !== null) {
      const isValid = isTokenValid(token);
      return {
        hasToken: isValid,
        token: isValid ? token : null,
      };
    }

    if (queryToken !== null && !token) {
      localStorage.setItem("SMA-accessToken", queryToken);
      const isValid = isTokenValid(queryToken);
      return {
        hasToken: isValid,
        token: isValid ? queryToken : null,
      };
    }

    if (queryToken !== null) {
      localStorage.setItem("SMA-accessToken", queryToken);
      const isValid = isTokenValid(queryToken);
      return {
        hasToken: isValid,
        token: isValid ? queryToken : null,
      };
    }

    if (token !== null) {
      const isValid = isTokenValid(token);
      return {
        hasToken: isValid,
        token: isValid ? token : null,
      };
    }
    return {
      hasToken: false,
      token: null,
    };
  }
};

interface tokenCheckerParameterI {
  queryToken?: string | null;
}
interface objectReturnI {
  hasToken: boolean;
  token: string | null;
}
