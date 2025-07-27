export const tokenChecker = ({
  queryToken,
}: tokenCheckerParameterI): objectReturnI => {
  const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  const tokenInLocalStorage = localStorage.getItem("SMA-accessToken");
  const token = tokenInLocalStorage === "null" ? null : tokenInLocalStorage;

  const isTokenValid = (tokenParam: string) => jwtRegex.test(tokenParam);

  if (!queryToken && !token) {
    return {
      hasToken: false,
      token: null,
    };
  } else {
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
  queryToken: string | null;
}
interface objectReturnI {
  hasToken: boolean;
  token: string | null;
}
