import type { z } from "zod";
import type { boardsSchema, oneBoardTasksSchema } from "./schema";

export type boardType = z.infer<typeof boardsSchema>;

export type oneBoardType = z.infer<typeof oneBoardTasksSchema>;

export type initStateBoards = {
  boards: boardType[];
  oneBoard: boardType | undefined;
  oneBoardTasks: oneBoardType[];
  loading: boolean;
  error: boolean;
};
