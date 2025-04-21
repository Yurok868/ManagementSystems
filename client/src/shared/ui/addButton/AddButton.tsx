import React from "react";
import styles from "./AddButton.module.css";
import { useAppDispatch } from "../../lib/ReduxHooks";
import { changeForm, changeModal } from "../../../entities/issues/lib/issuesSlice";

export default function AddButton(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const addHandler = () => {
    dispatch(changeModal());
    dispatch(changeForm(true))
  };
  return (
    <div className={styles.addTask} onClick={addHandler}>
      <button className={styles.addButton}>Создать задачу</button>
    </div>
  );
}
