import { createSlice } from "@reduxjs/toolkit";
import type { initState } from "../model/types";
import { addIssue, changeIssue, getIssues, getUsers } from "./issuesThunk";
import { toast } from "react-toastify";

const initialState: initState = {
  issues: [],
  issuesForShow: [],
  loading: true,
  error: false,
  modalIsOpen: false,
  create: true,
  oneIssue: null,
  filters: {
    id: true,
    letter: true,
    idBoard: true,
    status: 0,
  },
  people: [],
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    filterById: (state) => {
      if (state.filters.id) {
        state.issuesForShow.sort((a, b) => b.id - a.id);
        state.filters.id = !state.filters.id;
      } else {
        state.issuesForShow.sort((a, b) => a.id - b.id);
        state.filters.id = !state.filters.id;
      }
    },
    filterByLetter: (state) => {
      if (state.filters.letter) {
        state.issuesForShow.sort((a, b) => a.title.localeCompare(b.title));
        state.filters.letter = !state.filters.letter;
      } else {
        state.issuesForShow.sort((a, b) => b.title.localeCompare(a.title));
        state.filters.letter = !state.filters.letter;
      }
    },
    filterByIdBoard: (state) => {
      if (state.filters.idBoard) {
        state.issuesForShow.sort((a, b) => b.boardId - a.boardId);
        state.filters.idBoard = !state.filters.idBoard;
      } else {
        state.issuesForShow.sort((a, b) => a.boardId - b.boardId);
        state.filters.idBoard = !state.filters.idBoard;
      }
    },
    filterByIdStatus: (state) => {
      if (state.filters.status === 0) {
        const order = ["Backlog", "InProgress", "Done"];
        state.issuesForShow.sort(
          (a, b) => order.indexOf(a.status) - order.indexOf(b.status)
        );
        state.filters.status = 1;
      } else if (state.filters.status === 1) {
        const order = ["InProgress", "Backlog", "Done"];
        state.issuesForShow.sort(
          (a, b) => order.indexOf(a.status) - order.indexOf(b.status)
        );
        state.filters.status = 2;
      } else if (state.filters.status === 2) {
        const order = ["Done", "InProgress", "Backlog"];
        state.issuesForShow.sort(
          (a, b) => order.indexOf(a.status) - order.indexOf(b.status)
        );
        state.filters.status = 0;
      }
    },
    searchIssues: (state, action) => {
      const query = action.payload.toLowerCase();
      state.issuesForShow = state.issues.filter(
        (issues) =>
          issues.title.toLowerCase().includes(query) ||
          issues.assignee.fullName.toLowerCase().includes(query)
      );
    },
    changeModal: (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    },
    changeForm: (state, action) => {
      state.create = action.payload;
    },
    changeOneIssue: (state, action) => {
      state.oneIssue = action.payload;
    },
    changeTitle: (state, action) => {
      if (state.oneIssue) {
        state.oneIssue.title = action.payload;
      }
    },
    changeDescription: (state, action) => {
      if (state.oneIssue) {
        state.oneIssue.description = action.payload;
      }
    },
    changePriority: (state, action) => {
      if (state.oneIssue) {
        state.oneIssue.priority = action.payload;
      }
    },
    changeStatus: (state, action) => {
      if (state.oneIssue) {
        state.oneIssue.status = action.payload;
      }
    },
    changeUser: (state, action) => {
      if (state.oneIssue) {
        state.oneIssue.assignee.id = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIssues.fulfilled, (state, action) => {
        state.issues = action.payload;
        state.issuesForShow = action.payload;
        state.loading = false;
      })
      .addCase(getIssues.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.people = action.payload;
      })
      .addCase(addIssue.fulfilled, (state, action) => {
        const user = state.people.find(
          (el) => el.id === action.payload?.userId
        );
        const newIssue = { ...action.payload?.data, assignee: user };
        toast("Задача добавлена");
        state.issues.unshift(newIssue);
        state.issuesForShow.unshift(newIssue);
      })
      .addCase(changeIssue.fulfilled, (state, action) => {
        const taskForChange = state.issues.find(
          (el) => el.id === action.payload?.taskId
        );
        const user = state.people.find(
          (el) => el.id === action.payload?.assigneeId
        );
        if (taskForChange) {
          if (action.payload) {
            taskForChange.description = action.payload?.description;
            taskForChange.title = action.payload.title;
            taskForChange.status = action.payload.status;
            taskForChange.priority = action.payload.priority;
            taskForChange.assignee = user;
          }
        }

        const taskForChangeForShow = state.issuesForShow.find(
          (el) => el.id === action.payload?.taskId
        );
        if (taskForChangeForShow) {
          if (action.payload) {
            taskForChangeForShow.description = action.payload?.description;
            taskForChangeForShow.title = action.payload.title;
            taskForChangeForShow.status = action.payload.status;
            taskForChangeForShow.priority = action.payload.priority;
            taskForChangeForShow.assignee = user;
          }
        }
        toast("Задача изменена");
      });
  },
});

export const {
  filterById,
  filterByLetter,
  filterByIdBoard,
  filterByIdStatus,
  searchIssues,
  changeModal,
  changeForm,
  changeOneIssue,
  changeTitle,
  changeDescription,
  changePriority,
  changeStatus,
  changeUser,
} = issuesSlice.actions;

export default issuesSlice.reducer;
