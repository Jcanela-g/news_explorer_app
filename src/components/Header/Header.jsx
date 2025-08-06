import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Navigation />
        <h1 className="header__title">What's going on in the world?</h1>
        <p className="header__caption">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm />
      </div>
    </header>
  );
}
