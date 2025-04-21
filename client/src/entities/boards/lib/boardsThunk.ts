import { createAsyncThunk } from "@reduxjs/toolkit";
import { boardsSchema, oneBoardTasksSchema } from "../model/schema";
import axiosInstance from "../../../shared/lib/axiosInstance";

export const getBoards = createAsyncThunk("boards/getBoards", async () => {
  const response = await axiosInstance.get("boards");
  return boardsSchema.array().parse(response.data.data);
});

export const getOneBoard = createAsyncThunk(
  "boards/getOneBoard",
  async (id: string) => {
    const response = await axiosInstance.get(`boards/${id}`);

    return {arr: oneBoardTasksSchema.array().parse(response.data.data), id: Number(id)};
  }
);
