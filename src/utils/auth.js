import { setToken } from "./token";

const fakeId = () =>
  Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");

export const register = (username, password, email) => {
  return new Promise((resolve) => {
    const user = { _id: fakeId(), username, email };
    const jwt = `fake-${fakeId()}`;
    setToken(jwt);
    resolve({ jwt, user });
  });
};

export const authorize = (identifier, password) => {
  return new Promise((resolve) => {
    const user = {
      _id: fakeId(),
      username: identifier,
      email: `${identifier}@example.com`,
    };
    const jwt = `fake-${fakeId()}`;
    resolve({ jwt, user });
  });
};

export const getUserFromToken = (jwt) => {
  return new Promise((resolve, reject) => {
    if (!jwt) return reject(new Error("No token"));
    resolve({ username: "User", email: "user@example.com" });
  });
};
