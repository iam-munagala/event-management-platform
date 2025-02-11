import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, { name, email, password });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleRegister} className="form">
        <h2>Register</h2>
        <input type="text" placeholder="Name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
