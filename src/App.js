import React from "react";

import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";

import Header from "./components/Header/Header";

import Home from "./components/Home/Home";

import Start from "./components/Start/Start";

const App = () => {
  return (
    <main className={styles.main}>
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/start" element={<Start />} />
      </Routes>
    </main>
  );
};

export default App;
