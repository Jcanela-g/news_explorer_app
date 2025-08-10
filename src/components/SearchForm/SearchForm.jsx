import { React, useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter topic"
      />
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  );
}
