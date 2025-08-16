import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./SavedNewsPage.css";

function getKeywordsSummary(articles) {
  const counts = articles.reduce((acc, a) => {
    const k = (a.keyword || "").trim();
    if (k) acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);

  const [k1, k2, ...rest] = sorted;
  return { k1, k2, restCount: rest.length };
}

export default function SavedNewsPage({ savedArticles = [], onDelete, user }) {
  const userName = user?.name || "User";

  // const keywords = ["Nature", "Yellowstone", "Photography", "Parks"];

  // // Figma-style: first two keywords, then “and N other”
  // const top = keywords.slice(0, 2);
  // // const restCount = Math.max(0, keywords.length - top.length);

  const savedCount = savedArticles.length;
  const { k1, k2, restCount } = getKeywordsSummary(savedArticles);

  return (
    <section className="saved">
      <div className="saved__container">
        <p className="saved__subtitle">Saved articles</p>
        <h1 className="saved__title">
          {userName}, you have {savedCount} saved article
          {savedCount === 1 ? "" : "s"}
        </h1>

        <p className="saved__keywords">
          By keywords:&nbsp;
          {k1 && (
            <span className="saved__keywords saved__keywords_keyword">
              {k1}
            </span>
          )}
          {k2 && (
            <>
              ,{" "}
              <span className="saved__keywords saved__keywords_keyword">
                {k2}
              </span>
            </>
          )}
          {restCount > 0 && (
            <>
              , and{" "}
              <span className="saved__keywords saved__keywords_keyword">
                {restCount} other{restCount > 1 ? "s" : ""}
              </span>
            </>
          )}
        </p>
      </div>

      <div className="saved__grid">
        {savedArticles.map((a) => (
          <NewsCard
            key={a.url}
            article={a}
            variant="saved"
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
