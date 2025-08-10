import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./SavedNewsPage.css";

export default function SavedNewsPage() {
  const userName = "Elise";
  const savedCount = 5;
  const keywords = ["Nature", "Yellowstone", "Photography", "Parks"];

  // Figma-style: first two keywords, then “and N other”
  const top = keywords.slice(0, 2);
  const restCount = Math.max(0, keywords.length - top.length);

  const savedArticles = [
    {
      title: "Everyone Needs a Special 'Sit Spot' in Nature",
      description: "Ever since I read Richard Louv’s influential book…",
      publishedAt: "2020-11-04T00:00:00Z",
      urlToImage: "../../vendor/images/image_08.jpg", // any local image
      source: { name: "TREEHUGGER" },
      url: "https://example.com/a1",
      keyword: "Nature",
    },
    {
      title: "Nature makes you better",
      description: "We all know how good nature can make us feel…",
      publishedAt: "2019-02-19T00:00:00Z",
      urlToImage: "/vendor/images/image_09.jpg",
      source: { name: "NATIONAL GEOGRAPHIC" },
      url: "https://example.com/a2",
      keyword: "Photography",
    },
    {
      title: "Nature makes you better",
      description: "We all know how good nature can make us feel…",
      publishedAt: "2019-02-19T00:00:00Z",
      urlToImage: "/vendor/images/image_09.jpg",
      source: { name: "NATIONAL GEOGRAPHIC" },
      url: "https://example.com/a2",
      keyword: "Photography",
    },
    {
      title: "Nature makes you better",
      description: "We all know how good nature can make us feel…",
      publishedAt: "2019-02-19T00:00:00Z",
      urlToImage: "/vendor/images/image_09.jpg",
      source: { name: "NATIONAL GEOGRAPHIC" },
      url: "https://example.com/a2",
      keyword: "Photography",
    },
    {
      title: "Nature makes you better",
      description: "We all know how good nature can make us feel…",
      publishedAt: "2019-02-19T00:00:00Z",
      urlToImage: "/vendor/images/image_09.jpg",
      source: { name: "NATIONAL GEOGRAPHIC" },
      url: "https://example.com/a2",
      keyword: "Photography",
    },
    // add 2–3 more for layout
  ];

  return (
    <section className="saved">
      <div className="saved__container">
        <p className="saved__subtitle">Saved articles</p>
        <h1 className="saved__title">
          {userName}, you have {savedCount} saved articles
        </h1>

        <p className="saved__keywords">
          By keywords:&nbsp;
          <span className="saved__keywords saved__keyword--em">{top[0]}</span>
          {top[1] && (
            <>
              ,{" "}
              <span className="saved__keywords saved__keyword--em">
                {top[1]}
              </span>
            </>
          )}
          {restCount > 0 && (
            <>
              , and{" "}
              <span className="saved__keywords saved__keyword--em">
                {restCount} other
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
            variant="saved" // <-- important
            onDelete={() => {
              /* stub */
            }}
          />
        ))}
      </div>
    </section>
  );
}
