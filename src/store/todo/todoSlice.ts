import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {todoService} from "../../service/todo";
import type {TodoType} from "../../types/todos.ts";

interface TodosState {
  loading: boolean;
}

const initialState: TodosState = {
  loading: false,
};

export const createTodo = createAsyncThunk(
  'createTodo',
  async (task: TodoType) => {
    const res = await todoService.create(task)
    return res.data
  })

export const removeTodo = createAsyncThunk(
  'removeTodo',
  async (id: number) => {
    const res = await todoService.remove(id)
    return res.data
  })

export const updateTodo = createAsyncThunk(
  'updateTodo',
  async ({id, task}: {id: number, task: TodoType}) => {
    const res = await todoService.update(id, task)
    return res.data
  })

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTodo.pending, (state) => {
      state.loading = true
    }).addCase(createTodo.fulfilled, (state) => {
      state.loading = false
    }).addCase(removeTodo.pending, (state) => {
      state.loading = true
    }).addCase(removeTodo.fulfilled, (state) => {
      state.loading = false
    }).addCase(updateTodo.pending, (state) => {
      state.loading = true
    }).addCase(updateTodo.fulfilled, (state) => {
      state.loading = false
    })
  }
})