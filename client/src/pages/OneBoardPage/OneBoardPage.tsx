import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/lib/ReduxHooks";
import { getOneBoard } from "../../entities/boards/lib/boardsThunk";
import { useParams } from "react-router-dom";
import styles from "./OneBoardPage.module.css";
import {
  changeForm,
  changeModal,
  changeOneIssue,
} from "../../entities/issues/lib/issuesSlice";

export default function OneBoardPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    dispatch(getOneBoard(id));
  }, [id, dispatch]);

  const { oneBoardTasks, oneBoard } = useAppSelector((store) => store.boards);

  if (!oneBoard) {
    return (
      <div className={styles.cont}>
        <div className={styles.error}>
          <div>Уууу-упс!</div>
          <div>Такой доски не существует...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.conteiner}>
      <div className={styles.content}>
        <div className={styles.title}>
          <span>{oneBoard?.name}</span>
        </div>
        <div className={styles.table}>
          <div className={styles.tasks}>
            <div>To do</div>
          </div>
          <div className={styles.tasks}>
            <div>In progress</div>
          </div>
          <div className={styles.tasks}>
            <div>Done</div>
          </div>
        </div>
        <div className={styles.table1}>
          <div className={styles.tasks}>
            {oneBoardTasks
              .filter((task) => task.status === "Backlog")
              .map((task) => (
                <div
                  onClick={() => {
                    dispatch(changeModal());
                    dispatch(changeForm(false));
                    dispatch(changeOneIssue({ ...task }));
                  }}
                  key={task.id}
                  className={styles.oneTask}
                >{`Задача ${String(task.id)}`}</div>
              ))}
          </div>
          <div className={styles.tasks}>
            {oneBoardTasks
              .filter((task) => task.status === "InProgress")
              .map((task) => (
                <div
                  onClick={() => {
                    dispatch(changeModal());
                    dispatch(changeForm(false));
                    dispatch(changeOneIssue({ ...task }));
                  }}
                  key={task.id}
                  className={styles.oneTask}
                >{`Задача ${task.id}`}</div>
              ))}
          </div>
          <div className={styles.tasks}>
            {oneBoardTasks
              .filter((task) => task.status === "Done")
              .map((task) => (
                <div
                  onClick={() => {
                    dispatch(changeModal());
                    dispatch(changeForm(false));
                    dispatch(changeOneIssue({ ...task }));
                  }}
                  key={task.id}
                  className={styles.oneTask}
                >{`Задача ${task.id}`}</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
