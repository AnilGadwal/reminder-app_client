import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import CreateEvent from "./createEvent";
import EventCard from "./event";

const Events = ({ user, getEvents, events }) => {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const handleEditEvent = useCallback((eventID, updatedData) => {
    if (eventID) {
      axios
        .put(`${process.env.REACT_APP_API_BASE_URL}/events/${eventID}`, updatedData)
        .then((response) => {
          getEvents();
        })
        .catch((error) => {
          console.error("Error deleting event:", error);
        });
    } else {
      return;
    }
  }, []);

  const handleDeleteEvent = useCallback((eventID) => {
    if (eventID) {
      axios
        .delete(`${process.env.REACT_APP_API_BASE_URL}/events/${eventID}`)
        .then((response) => {
          getEvents();
        })
        .catch((error) => {
          console.error("Error deleting event:", error);
        });
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    getEvents();
  }, [openAddTask]);

  const handleType = (e) => {
    setTypeFilter(e.target.value);
  };

  const handlePriority = (e) => {
    setPriorityFilter(e.target.value);
  };

  useEffect(() => {
    if (typeFilter === "All" && priorityFilter === "All") {
      setFilteredEvents(events);
    } else {
      let filteredEvents = events;
      if (priorityFilter !== "All") {
        filteredEvents = filteredEvents.filter(
          (task) => task.priority === priorityFilter
        );
      }
      if (typeFilter !== "All") {
        filteredEvents = filteredEvents.filter(
          (task) => task.type === typeFilter
        );
      }
      setFilteredEvents(filteredEvents);
    }
  }, [events, priorityFilter, typeFilter]);

  return (
    <div className="events-list">
      <div className="event-list-header">
        <h2 className="desktop-only">
          {events.length ? "Your Schedule" : "You have no scheduled Tasks"}
        </h2>
        <div className="user-greeting mobile-only">
        Hi {user.name}, You currently have {events.length} task(s) scheduled
      </div>
        <button
          className="add-new-event-btn"
          onClick={() => setOpenAddTask(true)}
        >
          Add new task
        </button>
      </div>
      {events.length > 1 ? (
        <div className="filters">
          <label htmlFor="type">Filter by Type :</label>
          <select
            id="type"
            name="type"
            value={typeFilter}
            onChange={handleType}
          >
            <option value="All">All</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Outdoor Activities">Outdoor Activities</option>
            <option value="Mealtime">Mealtime</option>
            <option value="Other">Other</option>
          </select>
          <label htmlFor="priority">Filter by Priority :</label>
          <select
            id="priority"
            name="priority"
            value={priorityFilter}
            onChange={handlePriority}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      ) : null}

      <ul>
        {filteredEvents?.map((event) => (
          <div key={event.event_id}>
            <EventCard
              event={event}
              onDel={handleDeleteEvent}
              onEdit={handleEditEvent}
            />
          </div>
        ))}
      </ul>

      <div
        className="add-new-task"
        style={{ right: openAddTask ? "0" : "-100%" }}
      >
        <CreateEvent setOpenAddTask={setOpenAddTask} user={user} />
      </div>
    </div>
  );
};

export default Events;
