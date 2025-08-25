import {
  NEWS_API_BASE_URL,
  NEWS_API_KEY,
  NEWS_API_PAGE_SIZE,
  getDateRange,
} from "./constants";

export function searchNews(query) {
  if (!query || !query.trim()) {
    return Promise.reject(new Error("Please enter a keyword"));
  }

  const { from, to } = getDateRange(7);
  const params = new URLSearchParams({
    q: query.trim(),
    from,
    to,
    pageSize: String(NEWS_API_PAGE_SIZE),
    apiKey: NEWS_API_KEY,
  });

  const url = `${NEWS_API_BASE_URL}?${params.toString()}`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          const msg = `Request failed: ${res.status}${
            text ? ` - ${text}` : ""
          }`;
          return Promise.reject(new Error(msg));
        });
      }
      return res.json();
    })
    .then((data) => {
      if (data.status !== "ok") {
        return Promise.reject(new Error(data.message || "News API error"));
      }
      return Array.isArray(data.articles) ? data.articles : [];
    });
}
