import React from "react";
import { Link } from "react-router-dom";
import githubIcon from "../../vendor/images/github.png";
import facebookIcon from "../../vendor/images/fb.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2025 Supersite, Powered by News API
        </p>
        <ul className="footer__links">
          <li>
            <Link to="/" className="footer__link">
              Home
            </Link>
          </li>
          <li>
            <a
              href="https://tripleten.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              TripleTen
            </a>
          </li>
        </ul>
        <ul className="footer__social">
          <li>
            <a
              href="https://github.com/Jcanela-g"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              <img
                src={githubIcon}
                alt="GitHub"
                className="footer__social-icon"
              />
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              <img
                src={facebookIcon}
                alt="Facebook"
                className="footer__social-icon"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
