"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { validateAuthorization } from "./utils/apis/validateApi";
import { socket } from "./socket/socket";

export const AuthProviderContext = createContext<ProviderContextI>({
  userData: {
    accessToken: null,
    user_id: null,
    given_name: null,
    family_name: null,
    picture: null,
  },
  setUserData: () => {},
});

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const allowedPaths = ["/", "/dashboard", "/conversations"];
  const notAllowedPaths = ["/signin"];
  const isAllowed = allowedPaths.some(
    (allowed) => path === allowed || path.startsWith(`${allowed}/`)
  );
  const router = useRouter();
  const [userData, setUserData] = useState<UserI>({
    accessToken: null,
    user_id: null,
    given_name: null,
    family_name: null,
    picture: null,
  });

  useEffect(() => {
    const validate = async () => {
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

        if (response.status === 200) {
          const data = await response.json();
          setUserData(data?.data);
          socket.emit("user-online", data?.data?.user_id);
          socket.emit("register", data?.data?.user_id);
        }
      } catch (error) {
        console.log("Error found", {
          file_path: "AuthProvider.tsx",
          error,
        });
        throw new Error("Something went wrong");
      }
    };
    validate();
    return () => {
      socket.off("user-online");
    };
  }, []);

  return (
    <AuthProviderContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};

export default AuthWrapper;

interface ProviderContextI {
  userData: {
    accessToken: string | null;
    user_id: string | null;
    given_name: string | null;
    family_name: string | null;
    picture: string | null;
  };
  setUserData: Dispatch<SetStateAction<any>>;
}

interface UserI {
  accessToken: string | null;
  user_id: string | null;
  given_name: string | null;
  family_name: string | null;
  picture: string | null;
}
