import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

export default function Header({
  onSearch,
  showSearch = true,
  onSignIn,
  onSignOut,
  isLoggedIn,
  user,
}) {
  return (
    <header className="header">
      <div className="header__container">
        <Navigation
          onSignIn={onSignIn}
          onSignOut={onSignOut}
          isLoggedIn={isLoggedIn}
          user={user}
        />

        <h1 className="header__title">What's going on in the world?</h1>
        <p className="header__caption">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        {showSearch && <SearchForm onSearch={onSearch} />}
      </div>
    </header>
  );
}
