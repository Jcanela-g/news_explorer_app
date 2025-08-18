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

  // ESC closes + lock body scroll while open
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
    `navigation__link ${isActive ? "navigation__link--active" : ""}`;

  return (
    <>
      <div className={`navigation navigation--${theme}`}>
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
            className="navigation__btn navigation__btn--signout"
            onClick={onSignOut}
            aria-label="Log out"
          >
            <span className="navigation__user">{user?.name || "User"}</span>
            <img
              src={logoutSrc}
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

        <button
          className={`navigation__menuBtn ${
            theme === "saved" ? "navigation__menuBtn--saved" : ""
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={toggle}
        ></button>
      </div>

      {open && (
        <>
          <div className="navigation__backdrop" onClick={close} />
          <div
            className="navigation__sheet"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
          >
            <div className="navigation__sheetHeader">
              <span className="navigation__logo">NewsExplorer</span>
              <button
                className="navigation__closeBtn"
                aria-label="Close menu"
                onClick={close}
              />
            </div>

            <nav className="navigation__sheetBody">
              <NavLink
                to="/"
                end
                className="navigation__mobileLink"
                onClick={close}
              >
                Home
              </NavLink>

              {isLoggedIn && (
                <NavLink
                  to="/saved-news"
                  className="navigation__mobileLink"
                  onClick={close}
                >
                  Saved articles
                </NavLink>
              )}

              {isLoggedIn ? (
                <button
                  className="navigation__mobileBtn navigation__mobileBtn--outline"
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
                    alt=""
                    aria-hidden="true"
                    className="navigation__logout-icon"
                  />
                </button>
              ) : (
                <button
                  className="navigation__mobileBtn"
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
