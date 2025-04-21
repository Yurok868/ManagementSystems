import { z } from "zod";
import { assigneeSchema } from "../../issues/model/schema";

export const boardsSchema = z.object({
  id: z.number(),
  description: z.string(),
  name: z.string(),
  taskCount: z.number(),
});

export const oneBoardTasksSchema = z.object({
  assignee: assigneeSchema,
  description: z.string(),
  id: z.number(),
  priority: z.string(),
  status: z.string(),
  title: z.string(),
});
