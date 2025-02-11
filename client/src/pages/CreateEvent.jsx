import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/create`,
        { title, description, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create event:", error.response.data.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleCreate} className="form">
        <h2>Create Event</h2>
        <input type="text" placeholder="Title" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        <input type="datetime-local" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} required />
        <button className="submit-btn">Create</button>
      </form>
    </div>
  );
};

export default CreateEvent;
