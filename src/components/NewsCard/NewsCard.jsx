import React from "react";

import "./NewsCard.css";

export default function NewsCard({
  article,
  onSave,
  onDelete,
  variant = "search",
  isLoggedIn = false,
  isSaved = false,
}) {
  const { title, description, publishedAt, urlToImage, source, keyword } =
    article;
  const date = new Date(publishedAt).toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="news-card">
      <img src={urlToImage} alt={title} className="news-card__image" />
      {variant === "saved" && keyword && (
        <span className="news-card__chip">{keyword}</span>
      )}
      <div className="news-card__content">
        <p className="news-card__date">{date}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>
        <p className="news-card__source">{source?.name}</p>
      </div>{" "}
      {variant === "search" ? (
        <div className="news-card__action">
          {!isLoggedIn && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
          <button
            className={`news-card__save ${
              isSaved ? "news-card__save_saved" : ""
            }`}
            aria-label={isLoggedIn ? "Save article" : "Sign in to save"}
            aria-disabled={!isLoggedIn}
            onClick={() => isLoggedIn && onSave?.(article)}
          />
        </div>
      ) : (
        <div className="news-card__action news-card__action_delete">
          <span className="news-card__tooltip">Remove from saved</span>

          <button
            className="news-card__delete"
            aria-label="Remove from saved"
            onClick={() => onDelete?.(article)}
          />
        </div>
      )}
    </article>
  );
}
