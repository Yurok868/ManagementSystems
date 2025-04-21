import { createAsyncThunk } from "@reduxjs/toolkit";
import { assigneeSchema, tasksSchema } from "../model/schema";
import axiosInstance from "../../../shared/lib/axiosInstance";
import { formType, formTypeChange } from "../model/types";
import {
  addIssueToBoard,
  changeIssueToBoard,
} from "../../boards/lib/boardsSlice";

export const getIssues = createAsyncThunk("issues/getIssues", async () => {
  const response = await axiosInstance.get("tasks");
  return tasksSchema.array().parse(response.data.data);
});

export const getUsers = createAsyncThunk("issues/getUsers", async () => {
  const response = await axiosInstance.get("users");
  return assigneeSchema.array().parse(response.data.data);
});

export const addIssue = createAsyncThunk(
  "issues/addIssue",
  async (data: formType, { dispatch }) => {
    const response = await axiosInstance.post("tasks/create", data);
    const { priority, title, description, boardId, assigneeId } = data;
    const newIssue = {
      id: response?.data.data.id,
      status: "Backlog",
      priority,
      title,
      description,
      boardId,
    };
    const users = await axiosInstance.get("users");
    const user = users.data.data.find((el) => el.id === assigneeId);
    dispatch(
      addIssueToBoard({
        assignee: user,
        title,
        description,
        id: response?.data.data.id,
        status: "Backlog",
        priority,
      })
    );

    if (response.status === 200)
      return { data: newIssue, userId: data.assigneeId };
  }
);

export const changeIssue = createAsyncThunk(
  "issues/changeIssue",
  async (data: formTypeChange, { dispatch }) => {
    const { taskId, ...payload } = data;

    const response = await axiosInstance.put(
      `tasks/update/${String(taskId)}`,
      payload
    );

    const users = await axiosInstance.get("users");
    const user = users.data.data.find((el) => el.id === data.assigneeId);
    dispatch(changeIssueToBoard({ data, user }));

    if (response.status === 200) return data;
  }
);
