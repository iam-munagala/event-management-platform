import { Link } from "react-router-dom";
import "../styles/global.css";

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="brand">Event Manager</Link>
      <div>
        {user ? (
          <>
            <Link to="/create" className="nav-link">Create Event</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
