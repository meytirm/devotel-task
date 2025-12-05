import {api} from "../axios-instance.ts";
import type {PaginatedResponse} from "../../types/api.ts";
import type {TodoType} from "../../types/todos.ts";

function findAll() {
  return api.get<PaginatedResponse<{ todos: TodoType[] }>>("/todos")
}

function create(task: TodoType) {
  return api.post('/todos', task)
}

function remove(id: number) {
  return api.del(`/todos/${id}`)
}

function update(id: number, task: TodoType) {
  return api.put(`/todos/${id}`, task)
}

export const todoService = {
  findAll,
  create,
  remove,
  update
}