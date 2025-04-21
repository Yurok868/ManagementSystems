import React from "react";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import AddButton from "../../ui/addButton/AddButton";
import ModalBoot from "../../ui/Modal/Modal";
import { useAppSelector } from "../../lib/ReduxHooks";
import { ToastContainer } from "react-toastify";

export default function Header(): React.ReactElement {
  const modalIsOpen = useAppSelector((store) => store.issues.modalIsOpen);
  const location = useLocation();
  return (
    <div className={styles.header}>
      <div className={styles.flex}>
        <div className={styles.links}>
          <Link
            to="/issues"
            className={`${styles.link} ${
              location.pathname === "/issues" ? styles.active : ""
            }`}
          >
            Все задачи
          </Link>
          <Link
            to="/boards"
            className={`${styles.link} ${
              location.pathname.includes("/boards") ||
              location.pathname === "/boards"
                ? styles.active
                : ""
            }`}
          >
            Проекты
          </Link>
        </div>
        <ToastContainer />
        <AddButton />
      </div>
      {modalIsOpen && <ModalBoot open={modalIsOpen} />}
    </div>
  );
}
