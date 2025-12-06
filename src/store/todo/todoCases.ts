import { type TodosState } from "./todoSlice.ts";
import type {
  ActionReducerMapBuilder,
  AsyncThunk,
  AsyncThunkConfig,
} from "@reduxjs/toolkit";
import type { DeletedTodoType, TodoType } from "../../types/todos.ts";

export const createTodoCases = (
  builder: ActionReducerMapBuilder<TodosState>,
  createTodo: AsyncThunk<TodoType, string, AsyncThunkConfig>,
) => {
  builder
    .addCase(createTodo.pending, (state) => {
      state.loading.create = true;
    })
    .addCase(createTodo.fulfilled, (state, action) => {
      state.todos.unshift(action.payload);
      state.loading.create = false;
    });
};

export const removeTodoCases = (
  builder: ActionReducerMapBuilder<TodosState>,
  removeTodo: AsyncThunk<
    DeletedTodoType,
    {
      id: number;
      isLocal?: boolean;
    },
    AsyncThunkConfig
  >,
) => {
  builder
    .addCase(removeTodo.pending, (state) => {
      state.loading.remove = true;
    })
    .addCase(removeTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      state.loading.remove = false;
    });
};
export const updateTodoCases = (
  builder: ActionReducerMapBuilder<TodosState>,
  updateTodo: AsyncThunk<
    TodoType,
    {
      task: TodoType;
    },
    AsyncThunkConfig
  >,
) => {
  builder
    .addCase(updateTodo.pending, (state) => {
      state.loading.update = true;
    })
    .addCase(updateTodo.fulfilled, (state, action) => {
      state.loading.update = false;
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    });
};
