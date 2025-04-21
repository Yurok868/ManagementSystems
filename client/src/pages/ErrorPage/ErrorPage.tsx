import React from "react";
import styles from "./ErrorPage.module.css";

export default function ErrorDefaultPage(): React.ReactElement {
  return (
    <div className={styles.cont}>
      <div className={styles.error}>
        <div>Уууу-упс!</div>
        <div>Такой страницы не существует...</div>
      </div>
    </div>
  );
}
