import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../shared/lib/ReduxHooks";
import { getIssues, getUsers } from "../../entities/issues/lib/issuesThunk";
import styles from "./IssuesPage.module.css";
import {
  changeForm,
  changeModal,
  changeOneIssue,
  filterById,
  filterByIdBoard,
  filterByIdStatus,
  filterByLetter,
  searchIssues,
} from "../../entities/issues/lib/issuesSlice";
import AddButton from "../../shared/ui/addButton/AddButton";
import { getBoards } from "../../entities/boards/lib/boardsThunk";

export default function MainPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    setTimeout(() => {
      dispatch(getIssues());
      dispatch(getUsers());
      dispatch(getBoards());
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    void dispatch(searchIssues(searchValue));
  }, [searchValue, dispatch]);

  const { error, loading, issuesForShow } = useAppSelector(
    (store) => store.issues
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  function filterByIdHendler() {
    setOpen((prev) => !prev);
    dispatch(filterById());
  }

  function filterByLetterHendler() {
    setOpen((prev) => !prev);
    dispatch(filterByLetter());
  }

  function filterByIdBoardHendler() {
    setOpen((prev) => !prev);
    dispatch(filterByIdBoard());
  }

  function filterByIdStatusHendler() {
    setOpen((prev) => !prev);
    dispatch(filterByIdStatus());
  }

  if (loading) {
    return (
      <div className={styles.loader}>
        <ClipLoader color="#36d7b7" size={60} />
      </div>
    );
  } else if (!loading && error) {
    return (
      <div className={styles.loader}>
        <div className={styles.error}>
          <div>Уууу-упс!</div>
          <div> Ошибка получения данных...</div>
          <div>Мы уже работаем над проблемой!</div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.conteiner}>
      <div className={styles.searchFilter}>
        <input
          className={styles.search}
          placeholder="Поиск"
          value={searchValue}
          onChange={handleChange}
        />
        <div className={styles.selectFilter}>
          <button
            className={styles.butFilter}
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            {!open ? "Фильтры ▼" : "Фильтры ▲"}
          </button>
          {open && (
            <div className={styles.filters}>
              <button onClick={filterByIdHendler} className={styles.oneFilter}>
                По ID задачи
              </button>
              <button
                onClick={filterByIdBoardHendler}
                className={styles.oneFilter}
              >
                По ID доски
              </button>
              <button
                onClick={filterByLetterHendler}
                className={styles.oneFilter}
              >
                По названию задачи
              </button>
              <button
                onClick={filterByIdStatusHendler}
                className={styles.oneFilter}
              >
                По статусу
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <span>Задачи</span>
        </div>
        <div className={styles.tasks}>
          {issuesForShow.map((issue) => (
            <div key={issue.id} className={styles.oneTask}>
              <div className={styles.column}>
                <span>{`Задача ${issue.id}`}</span>
                <span>{issue.status}</span>
                <span>{`(доска ${issue.boardId})`}</span>
              </div>
              <div className={styles.column} style={{ fontSize: "20px" }}>
                <span>{`${issue.title.slice(0, 26)}...`}</span>
                <span>{`(${issue.assignee.fullName})`}</span>
              </div>
              <button
                onClick={() => {
                  dispatch(changeModal());
                  dispatch(changeForm(false));
                  dispatch(changeOneIssue(issue));
                }}
                className={styles.changeBut}
              >
                Редактировать задачу
              </button>
            </div>
          ))}
          <AddButton />
        </div>
      </div>
    </div>
  );
}
