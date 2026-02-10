import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSettings = location.pathname === "/settings";

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-left">
          {isSettings ? (
            <p className="nav-close-btn" onClick={() => navigate(-1)}>
              <img
                src={`/ui/icons/cross.svg`}
                width={40}
                height={40}
                alt="Close"
              />
            </p>
          ) : (
            <Link to="/settings">
              <img
                src={`/ui/icons/gear.svg`}
                width={40}
                height={40}
                alt="Index"
              />
            </Link>
          )}
        </div>
        <div className="nav-center">
          <h1>
            <Link to="/" className="nav-title">
              {isSettings ? "Settings" : "Weather App"}
            </Link>
          </h1>
        </div>
        <div className="nav-right">
          <Link to="/">
            <img
              src={`/ui/icons/weather-svgrepo-com.svg`}
              width={40}
              height={40}
              alt="Index"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
