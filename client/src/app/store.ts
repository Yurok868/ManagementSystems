import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "../entities/issues/lib/issuesSlice";
import boardsReducer from "../entities/boards/lib/boardsSlice";

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    boards: boardsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
