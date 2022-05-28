import React from "react";
import { LearningIcon } from "../assets/icons";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.home}>
      <div className={styles.landingText}>
        <h1>
          The easiest and fastest way to learn English:
          <br />
          <span>Be Exposed</span>
          <br />
          Now it's easy with <br /> Be Exposed!
        </h1>
        <div className={styles.getStarted}>
          <button>Get Started 🚀</button>
        </div>
      </div>
      <div className={styles.landingFigure}>
        <LearningIcon />
      </div>
    </section>
  );
};

export default Home;
