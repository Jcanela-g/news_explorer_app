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
      <button className="navigation__signin-btn">Sign in</button>
    </div>
  );
}
