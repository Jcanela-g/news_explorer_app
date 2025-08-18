import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchNews } from "../../utils/api";
import * as auth from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";
import { getItems, saveArticle, deleteArticleById } from "../../utils/savedApi";

// import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

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
    removeToken();
    setIsLoggedIn(false);
    setUser({ name: "Elise", email: "" });
    setSavedArticles([]);
  };

  // function handleAuthSuccess(profile) {
  //   setIsLoggedIn(true);
  //   setUser({ name: profile.name, email: profile.email });
  //   closeLogin();
  //   closeRegister();
  // }

  async function handleLoginSubmit({ email, password }) {
    const { jwt, user } = await auth.authorize(email, password);
    setToken(jwt);
    setIsLoggedIn(true);
    setUser({ name: user.username || "User", email: user.email });
    const items = await getItems();
    setSavedArticles(items);
    setIsLoginOpen(false);
  }

  async function handleRegisterSubmit({ name, email, password }) {
    // const { jwt, user } = await auth.register(name || "User", password, email);
    // setToken(jwt);
    // setIsLoggedIn(true);
    // setUser({ name: user.username || name || "User", email: user.email });
    // const items = await getItems();
    // setSavedArticles(items);
    // setIsRegisterOpen(false);
    try {
      // you can still call the stub to “create” the user, but ignore the jwt
      await auth.register(name || "User", password, email);
      closeRegister();
      openRegSuccess(); // show “Registration successfully completed!”
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  }

  // const handleSave = (article) => {
  //   if (!isLoggedIn) return; // guarded by tooltip anyway
  //   setSavedArticles((prev) =>
  //     prev.some((a) => a.url === article.url) ? prev : [...prev, article]
  //   );
  // };

  // const handleDelete = (article) => {
  //   setSavedArticles((prev) => prev.filter((a) => a.url !== article.url));
  // };

  async function handleDelete(article) {
    if (article?._id) await deleteArticleById(article._id);
    setSavedArticles((prev) => prev.filter((a) => a._id !== article._id));
  }

  const isSaved = (article) => savedArticles.some((a) => a.url === article.url); // unique by url

  // const handleSave = (article) => {
  //   if (!isLoggedIn) return; // (or open login modal)
  //   setSavedArticles(
  //     (prev) =>
  //       isSaved(article)
  //         ? prev.filter((a) => a.url !== article.url) // remove
  //         : [...prev, { ...article, keyword: lastQuery.trim() }] // add
  //   );
  // };

  async function handleSave(article) {
    if (!isLoggedIn) return;
    if (isSaved(article)) {
      const doc = savedArticles.find((a) => a.url === article.url);
      if (doc?._id) await deleteArticleById(doc._id);
      setSavedArticles((prev) => prev.filter((a) => a.url !== article.url));
    } else {
      const created = await saveArticle({
        ...article,
        keyword: lastQuery.trim(),
      });
      setSavedArticles((prev) => [...prev, created]);
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
