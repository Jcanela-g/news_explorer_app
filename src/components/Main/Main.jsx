import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import testImage from "../../vendor/images/image_08.jpg";
import "./Main.css";

const exampleArticle = {
  title: "Exploring the Hidden Trails",
  description:
    "A short summary of what makes this trail so beautiful and unique…",
  publishedAt: "2025-08-01T12:00:00Z",
  urlToImage: testImage, // point at any local image
  source: { name: "Trailblazer Magazine" },
  url: "https://example.com/article",
};

export default function Main() {
  // temporarily ignore props
  return (
    <main className="main">
      <h2 className="main__title">Search results</h2> {/* Optional header */}
      <div className="main__cards">
        <NewsCard
          key={exampleArticle.url}
          article={exampleArticle}
          onSave={() => {}}
        />
      </div>
      <button
        className="main__show-more"
        //    onClick={showMore}
      >
        Show more
      </button>
      {/* remove Show more for now */}
    </main>
  );
}
