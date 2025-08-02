"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GenericResponse } from "./utils/types/commons/genericResponse";
import UsersCard from "./components/users-card";
import { getUsers } from "./utils/apis/usersApi";
import { userI } from "./utils/types/users/userTypes";
import { logoutUser } from "./utils/apis/authApi";
import { AuthProviderContext } from "./AuthProvider";
import { socket } from "./socket/socket";

export default function Page() {
  const router = useRouter();

  const [users, setUsers] = useState<userI[]>([]);
  const { userData } = useContext(AuthProviderContext);

  const logout = async () => {
    try {
      const response = await logoutUser();
      if (response.status === 200) {
        socket.disconnect();
        localStorage.removeItem("SMA-accessToken");
        router.replace("/signin");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await getUsers();
      const data: GenericResponse<any> = await response.json();

      if (data.ok) {
        setUsers(data.data);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchData();
    socket.on("user-status-refresh", (arg: boolean) => {
      if (arg === true) {
        fetchData();
      }
    });
    return () => {
      socket.off("user-status-refresh");
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="users-title">
          Welcome! <p>{`${userData.given_name} ${userData.family_name}`}</p>
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
              user.user_id !== userData.user_id && (
                <UsersCard key={user.user_id} {...user} />
              )
          )}
      </div>
    </div>
  );
}
