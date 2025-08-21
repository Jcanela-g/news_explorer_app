import { React, useState, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import notFoundImage from "../../vendor/images/notfound.svg";
import "./Main.css";

export default function Main({
  articles = [],
  loading,
  error,
  hasSearched,
  onSave,
  isLoggedIn,
  isSaved,
}) {
  const [visibleCount, setVisibleCount] = useState(3);
  const showMore = () =>
    setVisibleCount((c) => Math.min(c + 3, articles.length));

  // reset when a new search finishes
  useEffect(() => {
    if (!loading) setVisibleCount(3);
  }, [loading, hasSearched]);

  if (!hasSearched && !loading) return null;

  return (
    <main className="main">
      {loading && (
        <div className="main__status">
          <Preloader text="Searching for news..." />
        </div>
      )}

      {!loading && error && (
        <div className="main__status main__status-error">
          Sorry, something went wrong during the request. Please try again
          later.
        </div>
      )}

      {!loading && !error && hasSearched && articles.length === 0 && (
        <div className="main__status">
          <img src={notFoundImage} alt="" className="main__status-img" />
          <h3 className="main__status-title">Nothing Found</h3>
          <p className="main__status-msg">
            Sorry, but nothing matched your search terms.
          </p>
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <>
          <h2 className="main__title">Search results</h2>
          <div className="main__cards">
            {articles.slice(0, visibleCount).map((article) => (
              <NewsCard
                key={article.url}
                article={article}
                isLoggedIn={isLoggedIn}
                onSave={onSave}
                isSaved={isSaved(article)}
              />
            ))}
          </div>
          {visibleCount < articles.length && (
            <button className="main__show-more" onClick={showMore}>
              Show more
            </button>
          )}
        </>
      )}
    </main>
  );
}
