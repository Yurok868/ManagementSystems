import type { z } from "zod";
import type { assigneeSchema, tasksSchema } from "./schema";

export type tasksType = z.infer<typeof tasksSchema>;

export type peopleType = z.infer<typeof assigneeSchema>;

export type formType = {
  boardId: number;
  priority: string;
  assigneeId: number;
  title: string;
  description: string;
};

export type formTypeChange = {
  status: string;
  boardId: number;
  priority: string;
  assigneeId: number;
  title: string;
  description: string;
  taskId: number;
};

export type initState = {
  issues: tasksType[];
  issuesForShow: tasksType[];
  loading: boolean;
  error: boolean;
  modalIsOpen: boolean;
  create: boolean;
  oneIssue: null | tasksType;
  filters: {
    id: boolean;
    letter: boolean;
    idBoard: boolean;
    status: number;
  };
  people: peopleType[];
};
