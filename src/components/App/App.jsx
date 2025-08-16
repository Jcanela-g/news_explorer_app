import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchNews } from "../../utils/api";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage";
import About from "../About/About";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegistrationModal";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "Elise" });
  const [savedArticles, setSavedArticles] = useState([]);
  const [lastQuery, setLastQuery] = useState("");

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  const handleSearch = async (query) => {
    setHasSearched(true);
    setLastQuery(query);
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

  const handleSignIn = () => setIsLoginOpen(true);
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setSavedArticles([]);
  };

  function handleAuthSuccess(profile) {
    setIsLoggedIn(true);
    setUser({ name: profile.name, email: profile.email });
    closeLogin();
    closeRegister();
  }

  // const handleSave = (article) => {
  //   if (!isLoggedIn) return; // guarded by tooltip anyway
  //   setSavedArticles((prev) =>
  //     prev.some((a) => a.url === article.url) ? prev : [...prev, article]
  //   );
  // };

  const handleDelete = (article) => {
    setSavedArticles((prev) => prev.filter((a) => a.url !== article.url));
  };

  const isSaved = (article) => savedArticles.some((a) => a.url === article.url); // unique by url

  const handleSave = (article) => {
    if (!isLoggedIn) return; // (or open login modal)
    setSavedArticles(
      (prev) =>
        isSaved(article)
          ? prev.filter((a) => a.url !== article.url) // remove
          : [...prev, { ...article, keyword: lastQuery.trim() }] // add
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <div className="app__content">
              <Header
                onSearch={handleSearch}
                isLoggedIn={isLoggedIn}
                user={user}
                //  onSignIn={openLogin}
                onSignIn={handleSignIn} // for now use to toggle state
                onSignOut={handleSignOut}
                showSearch
              />

              <Main
                articles={articles}
                loading={loading}
                error={error}
                hasSearched={hasSearched}
                onSave={handleSave}
                isLoggedIn={isLoggedIn}
                isSaved={isSaved}
              />
              <About />
              <Footer />
              <LoginModal
                isOpen={isLoginOpen}
                onClose={closeLogin}
                onSwitchToRegister={() => {
                  closeLogin();
                  openRegister();
                }}
                onSuccess={handleAuthSuccess}
              />
              <RegisterModal
                isOpen={isRegisterOpen}
                onClose={closeRegister}
                onSwitchToLogin={() => {
                  closeRegister();
                  openLogin();
                }}
                onSuccess={handleAuthSuccess}
              />
            </div>
          </div>
        }
      />
      <Route
        path="/saved-news"
        element={
          <div className="app">
            <div className="app__content">
              <Header
                onSearch={handleSearch}
                showSearch={false}
                isLoggedIn={isLoggedIn}
                user={user}
                onSignOut={handleSignOut}
              />
              <SavedNewsPage
                savedArticles={savedArticles}
                onDelete={handleDelete}
                user={user}
              />
              <Footer />
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
