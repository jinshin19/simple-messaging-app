"use client";

import MessagesCard from "../components/messages-card";

const Dashboard = () => {
  const name = "Joshua Philip Unilongo";
  const logout = async () => {
    console.log("You clicked the logout buttton");
  };
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
