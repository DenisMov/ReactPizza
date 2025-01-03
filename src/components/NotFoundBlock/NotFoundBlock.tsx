import React from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root} data-testid="not-found-block">
      <h1 data-testid="not-found-title">
        <span>😕</span>
        <br />
        Нічого не знайдено
      </h1>
      <p className={styles.description} data-testid="not-found-description">
        На жаль, цієї сторінки не існує
      </p>
      <a href="/" className={styles.link}>
        Повернутися на головну
      </a>
    </div>
  );
};
export default NotFoundBlock;
