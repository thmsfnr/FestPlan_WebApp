
import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/App.css";
import * as AuthService from "./services/auth.service";
import IUser from './types/user.type';
import Login from "./components/Login";
import Home from "./components/Home";
import BoardAdmin from "./components/BoardAdmin";
import EventBus from "./common/EventBus";

/**
 * Component for the app
 */
const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    EventBus.on("logout", logOut);
    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  /**
   * Manage the logout of the user
   */
  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {/* Application name */}
        <section style={styles.name}>
          <Link to={"/"} className="navbar-brand">
            FestPlan
          </Link>
        </section>
        {/* Home */}
        <section className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
        </section>
        {currentUser ? (
          // Connected section
          <section className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Déconnexion
              </a>
            </li>
          </section>
          ) : (
          // Not connected section
          <section className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Connexion
              </Link>
            </li>
          </section>
        )}
      </nav>
      {/* Routes */}
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
  name: {
    "marginLeft": "20px",
  }
}

export default App;
