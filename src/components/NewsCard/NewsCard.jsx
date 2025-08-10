import React from "react";

import "./NewsCard.css";

export default function NewsCard({
  article,
  onSave,
  onDelete,
  variant = "search",
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
        <button
          className="news-card__save"
          aria-label="Save article"
          onClick={() => onSave?.(article)}
        />
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
