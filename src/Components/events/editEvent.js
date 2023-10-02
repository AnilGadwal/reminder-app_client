import React, { useState } from "react";
import {getToday, getLocalTime} from '../../utils'

const EditEvent = ({ setOpenEditTask, onEdit, eventID, currentEvent, currentDate }) => {
  const [formData, setFormData] = useState({
    event_date: getLocalTime(currentEvent.event_date),
    description: currentEvent.description,
    type: currentEvent.type,
    priority: currentEvent.priority,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="new-task-container">
        <button
          className="add-task-close-btn"
          onClick={() => setOpenEditTask(false)}
        >
          Close
        </button>
        <h2>Edit Event</h2>
        <form onSubmit={() => onEdit(eventID, formData)}>
          <div className="form-group">
            <label htmlFor="event_date">Date and Time</label>
            <input
              type="datetime-local"
              name="event_date"
              id="event_date"
              value={formData.event_date}
              onChange={handleChange}
              min={getToday()}
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
              onChange={handleChange}
              required
              placeholder="Description here"
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
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
