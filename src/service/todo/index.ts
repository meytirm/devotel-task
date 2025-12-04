import {api} from "../axios-instance.ts";

export function findAll() {
  return api.get("/todos")
}

export function create(task: string) {
  return api.post('/todos', task)
}

export function remove(id: number) {
  return api.del(`/todos/${id}`)
}

export function update(id: number, task: string) {
  return api.put(`/todos/${id}`, task)
}