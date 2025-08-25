export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const NEWS_API_PAGE_SIZE = 100;

export const NEWS_API_BASE_URL = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

export function getDateRange(days = 7) {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - days);
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}
