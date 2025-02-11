import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";

const EventDetails = ({ socket }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events/${id}`);
      setEvent(res.data);
    };

    fetchEvent();
    socket.emit("joinEvent", id);

    socket.on("updateAttendees", (updatedAttendees) => {
      setAttendees(updatedAttendees);
    });

    return () => socket.emit("leaveEvent", id);
  }, [id, socket]);

  if (!event) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      <h3>Attendees: {attendees.length}</h3>
      <ul>
        {attendees.map((attendee) => (
          <li key={attendee._id}>{attendee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetails;
