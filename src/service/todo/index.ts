import { api } from "../axios-instance.ts";
import type { PaginatedResponse } from "../../types/api.ts";
import type { DeletedTodoType, TodoType } from "../../types/todos.ts";

function findAll() {
  return api.get<PaginatedResponse<{ todos: TodoType[] }>>("/todos");
}

function create(todo: string) {
  return api.post<
    TodoType,
    { todo: string; userId: number; completed: boolean }
  >("/todos/add", { todo, userId: 1, completed: false });
}

function remove(id: number) {
  return api.del<DeletedTodoType>(`/todos/${id}`);
}

function update(id: number, task: { todo: string; completed: boolean }) {
  return api.put<TodoType, { todo: string; completed: boolean }>(
    `/todos/${id}`,
    task,
  );
}

export const todoService = {
  findAll,
  create,
  remove,
  update,
};
