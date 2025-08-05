import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app__content">
          <Header />
          {/* <Main />
          <About />
          <Footer /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
