"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { tokenChecker } from "../utils/helpers/tokenChecker";
import { GenericResponse } from "../utils/types/commons/genericResponse";
import UsersCard from "../components/users-card";
import { getUsers } from "../utils/apis/usersApi";
import { userI } from "../utils/types/users/userTypes";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? null;

  const [users, setUsers] = useState<userI[]>([]);
  const name = "Joshua Philip Unilongo";
  const logout = async () => {
    console.log("You clicked the logout buttton");
  };

  useEffect(() => {
    tokenChecker({ queryToken: token });
    const fetchData = async () => {
      try {
        const response = await getUsers();
        const data: GenericResponse<any> = await response.json();
        setUsers(data.data);
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
      <hr />
      <div className="users-wrapper">
        {users?.length > 0 &&
          users.map((user) => <UsersCard key={user.user_id} {...user} />)}
      </div>
    </div>
  );
};

export default Dashboard;
