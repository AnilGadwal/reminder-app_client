import React from "react";

const Overview = ({ user, events }) => {
  const highPriority = events.filter((task) => task.priority === "High")?.length;
  const medPriority = events.filter((task) => task.priority === "Medium")?.length;
  const lowPriority = events.filter((task) => task.priority === "Low")?.length;

  const other = events.filter((task) => task.type === "Other")?.length;
  const outdoor = events.filter((task) => task.type === "Outdoor Activities")?.length;
  const mealtime = events.filter((task) => task.type === "Mealtime")?.length;
  const entertainment = events.filter((task) => task.type === "Entertainment")?.length;

  return (
    <div className="schedule-overview">
      <div className="user-greeting">
        Hi {user.name}, You currently have {events.length} task(s) scheduled
      </div>
      <div className="priority-cards">
        <div className="priority-card">{highPriority} High priority tasks currently active</div>
        <div className="priority-card">{medPriority} Medium priority tasks currently active</div>
        <div className="priority-card">{lowPriority} Low priority tasks currently active</div>
      </div>
      <div className="type-cards">
        <div className="type-card">Outdoor : {outdoor}</div>
        <div className="type-card">Mealtime : {mealtime}</div>
        <div className="type-card">Entertainment : {entertainment}</div>
        <div className="type-card">Other : {other}</div>
      </div>
    </div>
  );
};

export default Overview;
