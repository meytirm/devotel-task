import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {todoService} from "../../service/todo";
import type {DeletedTodoType, TodoType} from "../../types/todos.ts";

export interface TodosState {
  loading: {
    create: boolean;
    delete: boolean;
    update: boolean;
  }
  todos: TodoType[];
}

const initialState: TodosState = {
  loading: {
    create: false,
    delete: false,
    update: false
  },
  todos: []
};

export const createTodo = createAsyncThunk<TodoType, string>(
  'createTodo',
  async (task: string) => {
    const res = await todoService.create(task)
    return res.data as TodoType
  })

export const removeTodo = createAsyncThunk<DeletedTodoType, number>(
  'removeTodo',
  async (id: number) => {
    const res = await todoService.remove(id)
    return res.data
  })

export const updateTodo = createAsyncThunk<TodoType, {id: number, task: {todo: string, completed: boolean}}>(
  'updateTodo',
  async ({id, task}: {id: number, task: {todo: string, completed: boolean}}) => {
    const res = await todoService.update(id, task)
    return res.data
  })

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos.push(...action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createTodo.pending, (state) => {
      state.loading.create = true
    }).addCase(createTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload)
      state.loading.create = false
    }).addCase(removeTodo.pending, (state) => {
      state.loading.delete = true
    }).addCase(removeTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
      state.loading.delete = false
    }).addCase(updateTodo.pending, (state) => {
      state.loading.update = true
    }).addCase(updateTodo.fulfilled, (state, action) => {
      state.loading.update = false
      const index = state.todos.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) {
        state.todos[index] = action.payload
      }
    })
  }
})

export const {setTodos} = todoSlice.actions
export default todoSlice.reducer