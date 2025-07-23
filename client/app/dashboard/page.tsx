"use client";
import { useEffect, useState } from "react";
import MessagesCard from "../components/messages-card";
import { getConversations } from "../utils/apis/conversationsApi";
import { useSearchParams } from "next/navigation";
import { tokenChecker } from "../utils/helpers/tokenChecker";
import { GenericResponse } from "../utils/types/commons/genericResponse";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? null;

  const [data, setData] = useState([]);
  const name = "Joshua Philip Unilongo";
  const logout = async () => {
    console.log("You clicked the logout buttton");
  };

  useEffect(() => {
    tokenChecker({ queryToken: token });
    const fetchData = async () => {
      try {
        const response = await getConversations();
        const data: GenericResponse<any> = await response.json();
        setData(data.data);
      } catch (error: any) {
        throw new Error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="dashboard">
      <div className="message-wrapper">
        <div className="message-title">
          <p>{name}</p>
        </div>
        <MessagesCard />
        <MessagesCard />
        <MessagesCard />
        <MessagesCard />
        <MessagesCard />
        <MessagesCard />
        <MessagesCard />
      </div>
      <button type="button" onClick={logout} className="logout">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
