import { Link } from "react-router-dom";
import "./Navigation.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🌤️ MeteoApp
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Ricerca</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
