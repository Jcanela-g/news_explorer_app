import React from "react";

import "./NewsCard.css";

export default function NewsCard({
  article,
  onSave,
  onDelete,
  variant = "search",
  isLoggedIn = false,
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
      {/* Keyword chip (only on saved page) */}
      {variant === "saved" && keyword && (
        <span className="news-card__chip">{keyword}</span>
      )}
      <div className="news-card__content">
        <p className="news-card__date">{date}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>
        <p className="news-card__source">{source.name}</p>
      </div>{" "}
      {/* Top-right control: save vs delete */}
      {variant === "search" ? (
        // <button
        //   className="news-card__save"
        //   aria-label="Save article"
        //   onClick={() => onSave?.(article)}
        // />
        <div className="news-card__action">
          {!isLoggedIn && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
          <button
            className={`news-card__save ${
              !isLoggedIn ? "news-card__save--disabled" : ""
            }`}
            aria-label={isLoggedIn ? "Save article" : "Sign in to save"}
            aria-disabled={!isLoggedIn}
            onClick={() => isLoggedIn && onSave?.(article)}
          />
        </div>
      ) : (
        <button
          className="news-card__delete"
          aria-label="Remove from saved"
          onClick={() => onDelete?.(article)}
        />
      )}
    </article>
  );
}
