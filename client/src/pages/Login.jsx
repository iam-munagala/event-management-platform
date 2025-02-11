import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" className="input-field" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input-field" onChange={(e) => setPassword(e.target.value)} />
        <button className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
