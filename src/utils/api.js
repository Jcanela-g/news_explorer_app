import {
  NEWS_API_BASE_URL,
  NEWS_API_KEY,
  NEWS_API_PAGE_SIZE,
  getDateRange,
} from "./constants";

/**
 * Search news articles for a query over the last 7 days.
 * Returns the raw array of articles from NewsAPI.
 * (We can normalize the shape later if needed.)
 */
export async function searchNews(query) {
  if (!query || !query.trim()) {
    throw new Error("Please enter a keyword");
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

  const res = await fetch(url);
  if (!res.ok) {
    // Try to surface a helpful message
    let msg = `Request failed: ${res.status}`;
    try {
      const text = await res.text();
      if (text) msg += ` - ${text}`;
    } catch {}
    throw new Error(msg);
  }

  const data = await res.json();

  // NewsAPI returns { status: 'ok'|'error', totalResults, articles }
  if (data.status !== "ok") {
    throw new Error(data.message || "News API error");
  }

  return Array.isArray(data.articles) ? data.articles : [];
}
