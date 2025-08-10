import React from "react";

import "./NewsCard.css";

export default function NewsCard({ article, onSave }) {
  const { title, description, publishedAt, urlToImage, source } = article;
  const date = new Date(publishedAt).toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="news-card">
      <img src={urlToImage} alt={title} className="news-card__image" />
      <div className="news-card__content">
        <p className="news-card__date">{date}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>
        <p className="news-card__source">{source.name}</p>
      </div>{" "}
      <button
        className="news-card__save"
        aria-label="Save article"
        onClick={() => onSave(article)}
      ></button>
    </article>
  );
}
