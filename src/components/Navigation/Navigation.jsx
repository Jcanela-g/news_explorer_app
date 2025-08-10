import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  return (
    <div className="navigation">
      <h2 className="navigation__title">NewsExplorer</h2>
      <NavLink
        to="/"
        className="navigation__link"
        activeClassName="navigation__link--active"
        exact
      >
        Home
      </NavLink>

      <NavLink
        to="/saved-news"
        className={({ isActive }) =>
          `navigation__link ${isActive ? "navigation__link--active" : ""}`
        }
      >
        Saved articles
      </NavLink>
      <button className="navigation__signin-btn">Sign in</button>
    </div>
  );
}
