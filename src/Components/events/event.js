import React, { useState } from "react";
import EditEvent from "./editEvent";

const EventCard = ({ event, onDel, onEdit }) => {
  const [openEditTask, setOpenEditTask] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const eventDate = new Date(event.adjusted_event_date);
  const description = event.description || "";
  const priority = event.priority || "low";
  
  const type = event.type || "";
  const eventID = event.event_id;

  const formattedTime = eventDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDay = eventDate.toLocaleDateString([], {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="event-card">
      <div className="date-and-time">
        <span>{formattedTime}</span>
        <span>{formattedDay}</span>
      </div>
      <div className="event-description-container">
        <span className="event-description">
          <span>{type}:</span> {description}
        </span>
      </div>
      <div className="event-del-edit">
        <button onClick={() => setOpenEditTask(true)}>Edit</button>
        <button onClick={() => setShowModal(true)}>Delete</button>
      </div>
      <div className={`priority ${priority}`} />
      <div
        className="add-new-task"
        style={{ right: openEditTask ? "0" : "-100%" }}
      >
        <EditEvent
          setOpenEditTask={setOpenEditTask}
          onEdit={onEdit}
          eventID={eventID}
          currentEvent={event}
          currentDate={eventDate}
        />
      </div>
      {showModal ? (
        <div className="modal">
          Are you sure?
          <div>
            <button onClick={() => setShowModal(false)}>No</button>
            <button
              onClick={() => {
                onDel(eventID);
                setShowModal(false);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventCard;
