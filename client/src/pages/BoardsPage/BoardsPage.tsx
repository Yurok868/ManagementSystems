import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/lib/ReduxHooks";
import styles from "./BoardsPage.module.css";
import { Link } from "react-router-dom";
import { getBoards } from "../../entities/boards/lib/boardsThunk";

export default function BoardsPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);
  const { boards } = useAppSelector((store) => store.boards);

  return (
    <div className={styles.conteiner}>
      <div className={styles.content}>
        <div className={styles.title}>
          <span>Проекты</span>
        </div>
        <div className={styles.boards}>
          {boards.map((board) => (
            <div key={board.id} className={styles.oneBoard}>
              <span>{board.name}</span>
              <Link to={`${board.id}`} style={{ color: "blue" }}>
                Перейти к доске
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
