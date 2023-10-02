import React, { useState } from "react";
import axios from "axios";

const CreateEvent = ({ setOpenAddTask, user }) => {
  var tzoffset = new Date().getTimezoneOffset() * 60000;
  var today = new Date(Date.now() - tzoffset).toISOString().slice(0, 16);
  const [formData, setFormData] = useState({
    event_date: today,
    description: "",
    type: "Other",
    priority: "Low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const config = {
    headers: { user_id: user.user_id },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ("Notification" in window && Notification.permission !== "granted") {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          let service = await navigator.serviceWorker.ready;
          let push = await service.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
          });

          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/createNewEvent`,
            { ...formData, push },
            config
          );
          setOpenAddTask(false);
        } else {
          console.log("Notification permission denied");
        }
      } catch (error) {
        console.error("Notification permission error:", error);
      }
    } else {
      let service = await navigator.serviceWorker.ready;
      let push = await service.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
      });

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/createNewEvent`,
        { ...formData, push },
        config
      );
      setOpenAddTask(false);
    }
  };

  return (
    <div>
      <div className="new-task-container">
        <button
          className="add-task-close-btn"
          onClick={() => setOpenAddTask(false)}
        >
          Close
        </button>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="event_date">Date and Time</label>
            <input
              type="datetime-local"
              name="event_date"
              id="event_date"
              value={formData.event_date}
              onChange={handleChange}
              min={today}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              placeholder="Description here"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Entertainment">Entertainment</option>
              <option value="Outdoor Activities">Outdoor Activities</option>
              <option value="Mealtime">Mealtime</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
