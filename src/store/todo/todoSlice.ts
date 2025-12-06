import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {todoService} from "../../service/todo";
import type {DeletedTodoType, TodoType} from "../../types/todos.ts";
import {createTodoCases, removeTodoCases, updateTodoCases} from "./todoCases.ts";
import {arrayMove} from "@dnd-kit/sortable";

export interface TodosState {
  loading: {
    create: boolean;
    remove: boolean;
    update: boolean;
  }
  todos: TodoType[];
}

const initialState: TodosState = {
  loading: {
    create: false,
    remove: false,
    update: false
  },
  todos: []
};

export const createTodo = createAsyncThunk<TodoType, string>(
  'createTodo',
  async (task: string) => {
    const res = await todoService.create(task)
    return {...res.data, isLocal: true} as TodoType
  })

export const removeTodo = createAsyncThunk<DeletedTodoType, {id: number, isLocal?: boolean}>(
  'removeTodo',
  async ({id, isLocal}: {id: number, isLocal?: boolean}) => {
    if (isLocal) {
      return {id} as DeletedTodoType
    }
    const res = await todoService.remove(id)
    return res.data
  })

export const updateTodo = createAsyncThunk<TodoType, { task: TodoType }>(
  'updateTodo',
  async ({task}: {task: TodoType,}) => {
    console.log(task)
    if (task.isLocal) {
      return task as TodoType
    }
    const res = await todoService.update(task.id, {todo: task.todo, completed: task.completed})
    return res.data
  })

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload
    },
    reorderTodos: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      state.todos = arrayMove(state.todos, oldIndex, newIndex);
    }
  },
  extraReducers: (builder) => {
    createTodoCases(builder, createTodo)
    removeTodoCases(builder, removeTodo)
    updateTodoCases(builder, updateTodo)
  }
})

export const {setTodos, reorderTodos} = todoSlice.actions
export default todoSlice.reducer