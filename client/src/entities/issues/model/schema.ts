import { z } from "zod";

export const assigneeSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string(),
  avatarUrl: z.string(),
});

export const tasksSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  status: z.string(),
  assignee: assigneeSchema,
  boardId: z.number(),
});
