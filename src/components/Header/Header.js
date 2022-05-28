import React from "react";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h1>
          <a href="https://be-exposed.netlify.app">Be Exposed</a>
        </h1>
        <p>Get exposed & learn</p>
      </div>
    </header>
  );
};

export default Header;
