import React, { useState } from "react";
import Events from "../events/events";
import { logoutUser } from "../../utils";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Overview from "../overview";

const Dashboard = () => {
  const { user } = useOutletContext();
  const [events, setEvents] = useState([]);
  const config = {
    headers: { user_id: user.user_id },
  };
  const getEvents = () => {
    axios
      .get("http://localhost:3001/api/events", config)
      .then((response) => {
        setEvents(response.data.events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };
  return (
    <div className="dashboard">
      <div className="header container">
        <span className="logo">FhyniX</span>
        <button onClick={logoutUser}>Logout</button>
      </div>

      <div className="main-content container">
        <Events user={user} getEvents={getEvents} events={events} />
        <div className="divider" />
        <Overview user={user} events={events} />
      </div>
    </div>
  );
};

export default Dashboard;
