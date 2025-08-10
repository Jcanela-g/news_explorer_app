import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { searchNews } from "../../utils/api";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage";
import About from "../About/About";
import Footer from "../Footer/Footer";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setHasSearched(true);
    setLoading(true);
    setError(null);
    try {
      const results = await searchNews(query);
      setArticles(results);
    } catch (e) {
      setArticles([]);
      setError(e.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <div className="app__content">
              <Header onSearch={handleSearch} showSearch />

              <Main
                articles={articles}
                loading={loading}
                error={error}
                hasSearched={hasSearched}
                onSave={() => {}}
              />
              <About />
              <Footer />
            </div>
          </div>
        }
      />
      <Route
        path="/saved-news"
        element={
          <div className="app">
            <div className="app__content">
              <Header onSearch={handleSearch} showSearch={false} />
              <SavedNewsPage />
              <Footer />
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
