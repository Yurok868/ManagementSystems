import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout(): React.ReactElement {
  return (
    <>
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
