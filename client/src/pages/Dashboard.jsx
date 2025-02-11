import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/global.css";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events`);
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="container">
      <h1>Events</h1>
      {events.map((event) => (
        <div key={event._id} className="event-card">
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleString()}</p>
          <Link to={`/event/${event._id}`} className="view-btn">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
