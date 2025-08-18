import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logoutIcon from "../../vendor/images/logout.svg";
import "./Navigation.css";

export default function Navigation({ onSignIn, onSignOut, isLoggedIn, user }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

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
      <div className="navigation">
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

        <button
          className="navigation__menuBtn"
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
                    src={logoutIcon}
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

  // return (
  //   <>
  //     <div className="navigation">
  //       <NavLink to="/" className="navigation__title">
  //         NewsExplorer
  //       </NavLink>

  //       {/* desktop links */}
  //       <nav className="navigation__links">
  //         <NavLink to="/" end className={linkClass}>
  //           Home
  //         </NavLink>
  //         {isLoggedIn && (
  //           <NavLink to="/saved-news" className={linkClass}>
  //             Saved articles
  //           </NavLink>
  //         )}
  //       </nav>

  //       {/* desktop sign-in/out */}
  //       {isLoggedIn ? (
  //         <button
  //           className="navigation__btn navigation__btn--signout"
  //           onClick={onSignOut}
  //           aria-label="Log out"
  //           title={user?.name}
  //         >
  //           <span className="navigation__user">{user?.name || "User"}</span>
  //           <img
  //             src={logoutIcon}
  //             alt=""
  //             aria-hidden="true"
  //             className="navigation__logout-icon"
  //           />
  //         </button>
  //       ) : (
  //         <button className="navigation__btn" onClick={onSignIn}>
  //           Sign in
  //         </button>
  //       )}

  //       {/* hamburger (mobile only) */}
  //       <button
  //         className="navigation__menuBtn"
  //         aria-label={open ? "Close menu" : "Open menu"}
  //         aria-expanded={open}
  //         aria-controls="mobile-menu"
  //         onClick={toggle}
  //       >
  //         <span className="navigation__menuIcon" aria-hidden="true" />
  //       </button>
  //     </div>

  //     {/* mobile sheet */}
  //     {open && (
  //       <>
  //         <div className="navigation__backdrop" onClick={close} />
  //         <div
  //           className="navigation__sheet"
  //           id="mobile-menu"
  //           role="dialog"
  //           aria-modal="true"
  //         >
  //           <div className="navigation__sheetHeader">
  //             <span className="navigation__logo">NewsExplorer</span>
  //             <button
  //               className="navigation__closeBtn"
  //               aria-label="Close menu"
  //               onClick={close}
  //             />
  //           </div>

  //           <nav className="navigation__sheetBody">
  //             <NavLink
  //               to="/"
  //               end
  //               className="navigation__mobileLink"
  //               onClick={close}
  //             >
  //               Home
  //             </NavLink>

  //             {isLoggedIn && (
  //               <NavLink
  //                 to="/saved-news"
  //                 className="navigation__mobileLink"
  //                 onClick={close}
  //               >
  //                 Saved articles
  //               </NavLink>
  //             )}

  //             {isLoggedIn ? (
  //               <button
  //                 className="navigation__mobileBtn navigation__mobileBtn--outline"
  //                 onClick={() => {
  //                   close();
  //                   onSignOut?.();
  //                 }}
  //               >
  //                 <span className="navigation__user">
  //                   {user?.name || "User"}
  //                 </span>
  //                 <img
  //                   src={logoutIcon}
  //                   alt=""
  //                   aria-hidden="true"
  //                   className="navigation__logout-icon"
  //                 />
  //               </button>
  //             ) : (
  //               <button
  //                 className="navigation__mobileBtn"
  //                 onClick={() => {
  //                   close();
  //                   onSignIn?.();
  //                 }}
  //               >
  //                 Sign in
  //               </button>
  //             )}
  //           </nav>
  //         </div>
  //       </>
  //     )}
  //   </>
  // );
}
