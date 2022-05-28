import React from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../assets/icons";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.texts}>
        <h3 className={styles.text}>
          The easiest and fastest way to improve your English
        </h3>
        <h2 className={styles.free}>Completely Free</h2>
      </div>
      <h1 className={styles.madeBy}>
        Made by
        <br />
        <a
          href="https://linkedin.com/in/muhammederdal"
          target="_blank"
          rel="noopener noreferrer"
        >
          Muhammed Erdal
        </a>
        <br />
        with Love 🧡
      </h1>
      <div className={styles.social}>
        <a
          href="https://linkedin.com/in/muhammederdal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinIcon />
        </a>
        <a
          href="https://github.com/coderdal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
        <a
          href="https://twitter.com/cod_erdal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
