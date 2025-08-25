import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchNews } from "../../utils/api";
import * as auth from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";
import { getItems, saveArticle, deleteArticleById } from "../../utils/savedApi";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage";
import About from "../About/About";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegistrationModal";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRegSuccessOpen, setIsRegSuccessOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "Elise", email: "" });
  const [savedArticles, setSavedArticles] = useState([]);
  const [lastQuery, setLastQuery] = useState("");

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);
  const openRegSuccess = () => setIsRegSuccessOpen(true);
  const closeRegSuccess = () => setIsRegSuccessOpen(false);

  const handleSearch = (query) => {
    setHasSearched(true);
    setLastQuery(query);
    setLoading(true);
    setError(null);

    searchNews(query)
      .then((results) => setArticles(results))
      .catch((e) => {
        setArticles([]);
        setError(e.message || "Request failed");
      })
      .finally(() => setLoading(false));
  };

  const handleSignIn = () => setIsLoginOpen(true);
  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser({ name: "Elise", email: "" });
    setSavedArticles([]);
  };

  function handleLoginSubmit({ email, password }) {
    auth
      .authorize(email, password)
      .then(({ jwt, user }) => {
        setToken(jwt);
        setIsLoggedIn(true);
        setUser({ name: user.username || "User", email: user.email });
        return getItems();
      })
      .then((items) => {
        setSavedArticles(items);
        setIsLoginOpen(false);
      })
      .catch((err) => {
        alert(err?.message || "Login failed");
      });
  }

  function handleRegisterSubmit({ name, email, password }) {
    auth
      .register(name || "User", password, email)
      .then(() => {
        closeRegister();
        openRegSuccess();
      })
      .catch((err) => {
        alert(err?.message || "Registration failed");
      });
  }

  function handleDelete(article) {
    const removeById = () =>
      setSavedArticles((prev) => prev.filter((a) => a._id !== article._id));

    const removeByUrl = () =>
      setSavedArticles((prev) => prev.filter((a) => a.url !== article.url));

    if (article?._id) {
      deleteArticleById(article._id)
        .then(removeById)
        .catch(() => {});
    } else {
      // fallback for items saved without an _id (match by URL)
      removeByUrl();
    }
  }

  const isSaved = (article) => savedArticles.some((a) => a.url === article.url);

  function handleSave(article) {
    if (!isLoggedIn) return;

    if (isSaved(article)) {
      const doc = savedArticles.find((a) => a.url === article.url);
      if (doc?._id) {
        deleteArticleById(doc._id)
          .then(() =>
            setSavedArticles((prev) =>
              prev.filter((a) => a.url !== article.url)
            )
          )
          .catch(() => {});
      } else {
        setSavedArticles((prev) => prev.filter((a) => a.url !== article.url));
      }
    } else {
      saveArticle({ ...article, keyword: lastQuery.trim() })
        .then((created) => setSavedArticles((prev) => [...prev, created]))
        .catch(() => {});
    }
  }

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;
    auth
      .getUserFromToken(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setUser({ name: username, email });
        return getItems();
      })
      .then((items) => setSavedArticles(items))
      .catch(() => {});
  }, []);

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
                onSignIn={handleSignIn}
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
                onSubmit={handleLoginSubmit}
              />
              <RegisterModal
                isOpen={isRegisterOpen}
                onClose={closeRegister}
                onSwitchToLogin={() => {
                  closeRegister();
                  openLogin();
                }}
                onSubmit={handleRegisterSubmit}
              />
              <RegistrationSuccessModal
                isOpen={isRegSuccessOpen}
                onClose={closeRegSuccess}
                onSwitchToLogin={() => {
                  closeRegSuccess();
                  openLogin();
                }}
              />
            </div>
          </div>
        }
      />
      <Route
        path="/saved-news"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <div className="app">
              <div className="app__content">
                <Header
                  isMain={false}
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
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
