"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { tokenChecker } from "../utils/helpers/tokenChecker";
import { GenericResponse } from "../utils/types/commons/genericResponse";
import UsersCard from "../components/users-card";
import { getUsers } from "../utils/apis/usersApi";
import { userI } from "../utils/types/users/userTypes";
import { logoutUser } from "../utils/apis/authApi";
import { extractedTokenData } from "../utils/helpers/token.helper";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? null;

  const [users, setUsers] = useState<userI[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const logout = async () => {
    try {
      const response = await logoutUser();
      if (response.status === 200) {
        localStorage.removeItem("SMA-accessToken");
        router.replace("/signin");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const tokenCheckerResult = tokenChecker({ queryToken: token });
    /**
     * Note to myself:
     * This extractedTokenData kinda redundant, since I will extract the tokenData
     * which also I then store to localStorage, Why I shouldn't I return it to backend response instead when signin in or signin up.
     */
    const extractedTokenDataResult = extractedTokenData(
      tokenCheckerResult.token
    );
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

    setName(
      `${extractedTokenDataResult?.given_name} ${extractedTokenDataResult?.family_name}`
    );

    const fetchData = async () => {
      try {
        const response = await getUsers();
        const data: GenericResponse<any> = await response.json();
        setUsers(data.data);
        setCurrentUserId(extractedTokenDataResult?.user_id as string);
      } catch (error: any) {
        throw new Error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="users-title">
          Welcome! <p>{name}</p>
        </div>
        <div className="logout-wrapper">
          <button type="button" onClick={logout} className="logout">
            Logout
          </button>
        </div>
      </div>
      <span className="seperator"></span>
      <div className="users-wrapper">
        {users?.length > 0 &&
          users.map(
            (user) =>
              user.user_id !== currentUserId && (
                <UsersCard key={user.user_id} {...user} />
              )
          )}
      </div>
    </div>
  );
};

export default Dashboard;
