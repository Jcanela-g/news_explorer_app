import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app__content">
          <Header />
          <Main />
          <About />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
