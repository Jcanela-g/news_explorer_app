import React from "react";
import { NavLink } from "react-router-dom";
import logoutIcon from "../../vendor/images/logout.svg";
import "./Navigation.css";

export default function Navigation({ onSignIn, onSignOut, isLoggedIn, user }) {
  const linkClass = ({ isActive }) =>
    `navigation__link ${isActive ? "navigation__link--active" : ""}`;

  return (
    <div className="navigation">
      <NavLink to="/" className="navigation__title">
        NewsExplorer
      </NavLink>
      <NavLink
        to="/"
        end
        className={linkClass}
        // activeClassName="navigation__link--active"
      >
        Home
      </NavLink>

      {isLoggedIn && (
        <NavLink to="/saved-news" className={linkClass}>
          Saved articles
        </NavLink>
      )}
      {/* <button className="navigation__signin-btn" onClick={onSignIn}>
        Sign in
      </button> */}
      {isLoggedIn ? (
        <button
          className="navigation__btn navigation__btn--signout"
          onClick={onSignOut}
          aria-label="Log out"
        >
          <span className="navigation__user">{user?.name || "User"}</span>
          <img
            src={logoutIcon}
            alt="logout"
            aria-hidden="true"
            className="navigation__logout-icon"
          />
        </button>
      ) : (
        <button className="navigation__btn" onClick={onSignIn}>
          Sign in
        </button>
      )}
    </div>
  );
}
