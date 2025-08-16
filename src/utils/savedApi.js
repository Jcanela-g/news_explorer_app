const SAVED_KEY = "stub_saved_articles";

const read = () => JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
const write = (arr) => localStorage.setItem(SAVED_KEY, JSON.stringify(arr));

const fakeId = () =>
  Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");

// GET “/articles”
export function getItems() {
  return Promise.resolve(read());
}

// POST “/articles”
export function saveArticle(article) {
  return new Promise((resolve) => {
    const saved = read();
    const existing = saved.find((a) => a.url === article.url);
    if (existing) return resolve(existing);
    const doc = { _id: fakeId(), ...article };
    saved.push(doc);
    write(saved);
    resolve(doc);
  });
}

// DELETE “/articles/:id”
export function deleteArticleById(id) {
  return new Promise((resolve) => {
    const next = read().filter((a) => a._id !== id);
    write(next);
    resolve({ success: true });
  });
}
