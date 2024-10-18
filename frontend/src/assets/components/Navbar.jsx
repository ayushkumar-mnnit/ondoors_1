import "bootstrap/dist/css/bootstrap.min.css";
import "./css/nav.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextAPI";
import { MdAdminPanelSettings } from "react-icons/md";

import axios from "axios";

const api = "https://ondoors-1.onrender.com"; // hosted backend url

const Navbar = () => {
  const navigate = useNavigate();

  const { user, token } = useAuth();

  const handleScroll = (sectionId) => {
    navigate("/");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
    try {
      // Mdelete the token from the db on server side
      await axios.post(
        `${api}/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Clear the token from local storage
      localStorage.removeItem("token");

      window.location.reload(); // Reload to reflect the changes
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || "Server is down"
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {user && user.isAdmin ? (
          <Link to="/admin">
            {" "}
            <MdAdminPanelSettings color="#06D001" size={25} />
          </Link>
        ) : null}
        <Link className="navbar-brand" to="/">
          Ondoors
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" onClick={() => handleScroll("sec1")}>
                Home
              </a>
            </li>
            <li className="nav-item">
              {user && user.name!=='' ? (
                <Link to="/landing" className="nav-link">
                  Services
                </Link>
              ) : (
                <a className="nav-link" onClick={() => handleScroll("sec5")}>
                  Services
                </a>
              )}
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => handleScroll("sec3")}>
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => handleScroll("sec4")}>
                Get in Touch
              </a>
            </li>

            {user && user.name!=='' ? (
              <li className="nav-item">
                <a className="nav-link"  onClick={handleLogout}>Logout</a>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" onClick={() => handleScroll("sec2")}>
                  Login/Signup
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
