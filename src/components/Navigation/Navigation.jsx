import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logoutIcon from "../../vendor/images/logout.svg";
import logoutIconDark from "../../vendor/images/logout-dark.svg";
import "./Navigation.css";

export default function Navigation({
  onSignIn,
  onSignOut,
  isLoggedIn,
  user,
  theme = "home",
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);
  const logoutSrc = theme === "home" ? logoutIcon : logoutIconDark;

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `navigation__link ${isActive ? "navigation__link_active" : ""}`;

  return (
    <>
      <nav className={`navigation navigation__${theme}`}>
        <NavLink to="/" className="navigation__title">
          NewsExplorer
        </NavLink>
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>

        {isLoggedIn && (
          <NavLink to="/saved-news" className={linkClass}>
            Saved articles
          </NavLink>
        )}

        {isLoggedIn ? (
          <button
            className="navigation__btn navigation__btn_signout"
            onClick={onSignOut}
          >
            <span className="navigation__user">{user?.name || "User"}</span>
            <img
              src={logoutSrc}
              alt="logout button"
              className="navigation__logout-icon"
            />
          </button>
        ) : (
          <button className="navigation__btn" onClick={onSignIn}>
            Sign in
          </button>
        )}

        <button
          className={`navigation__menu-btn ${
            theme === "saved" ? "navigation__menu-btn_saved" : ""
          }`}
          onClick={toggle}
        ></button>
      </nav>

      {open && (
        <>
          <div className="navigation__backdrop" onClick={close} />
          <div className="navigation__sheet" id="mobile-menu" role="dialog">
            <div className="navigation__sheet-header">
              <span className="navigation__logo">NewsExplorer</span>
              <button className="navigation__close-btn" onClick={close} />
            </div>

            <nav className="navigation__sheet-body">
              <NavLink
                to="/"
                end
                className="navigation__mobile-link"
                onClick={close}
              >
                Home
              </NavLink>

              {isLoggedIn && (
                <NavLink
                  to="/saved-news"
                  className="navigation__mobile-link"
                  onClick={close}
                >
                  Saved articles
                </NavLink>
              )}

              {isLoggedIn ? (
                <button
                  className="navigation__mobile-btn navigation__mobile-btn_outline"
                  onClick={() => {
                    close();
                    onSignOut?.();
                  }}
                >
                  <span className="navigation__user">
                    {user?.name || "User"}
                  </span>
                  <img
                    src={logoutSrc}
                    alt="logout button"
                    className="navigation__logout-icon"
                  />
                </button>
              ) : (
                <button
                  className="navigation__mobile-btn"
                  onClick={() => {
                    close();
                    onSignIn?.();
                  }}
                >
                  Sign in
                </button>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
