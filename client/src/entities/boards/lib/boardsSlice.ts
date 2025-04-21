import { createSlice } from "@reduxjs/toolkit";
import type { initStateBoards } from "../model/types";
import { getBoards, getOneBoard } from "./boardsThunk";

const initialState: initStateBoards = {
  boards: [],
  oneBoard: undefined,
  oneBoardTasks: [],
  loading: true,
  error: false,
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addIssueToBoard(state, action) {
      state.oneBoardTasks.push(action.payload);
    },
    changeIssueToBoard(state, action) {
      state.oneBoardTasks = state.oneBoardTasks.filter(
        (task) => task.id !== action.payload.data.taskId
      );
      state.oneBoardTasks.push({
        id: action.payload.data.taskId,
        title: action.payload.data.title,
        description: action.payload.data.description,
        status: action.payload.data.status,
        priority: action.payload.data.priority,
        assignee: action.payload.user,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.loading = false;
      })
      .addCase(getBoards.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getOneBoard.fulfilled, (state, action) => {
        state.oneBoardTasks = action.payload.arr;
        state.oneBoard = state.boards.find(
          (board) => board.id === action.payload.id
        );
      });
  },
});

export const { addIssueToBoard, changeIssueToBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
