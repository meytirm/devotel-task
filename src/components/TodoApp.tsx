import Input from "./ui/Input.tsx";
import TodoListContainer from "./TodoListContainer.tsx";
import CreateTodoForm from "./common/CreateTodoForm.tsx";
import { useFindAllTodosQuery } from "../hooks/todo/useFindAllTodosQuery.ts";
import { useEffect, useState } from "react";
import type { TodoFormatType, TodoType } from "../types/todos.ts";
import { setTodos } from "../store/todo/todoSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import TodoFormatSelect from "./common/TodoFormatSelect.tsx";

const TodoApp = () => {
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<TodoFormatType>("all");
  const { data, isError, isLoading, refetch } = useFindAllTodosQuery();
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setTodos(data ? data.todos : []));
  }, [data, dispatch]);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredTodos = todos.filter((todo: TodoType) => {
    const text = todo.todo.toString().toLowerCase();
    if (!text.includes(normalizedSearch)) return false;
    if (statusFilter === "all") return true;
    if (statusFilter === "complete") return todo.completed;
    return !todo.completed;
  });

  return (
    <div className="flex justify-center items-center w-full">
      <div className="lg:w-2/4 w-full rounded-md p-4 flex flex-col justify-center items-center gap-4">
        <h1 className="font-bold">Todo List</h1>
        <CreateTodoForm />
        <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col gap-4">
          <div className="flex sm:flex-row flex-col justify-between items-center gap-4">
            <Input
              className=""
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <TodoFormatSelect value={statusFilter} onChange={setStatusFilter} />
          </div>
          <TodoListContainer
            todos={filteredTodos}
            isError={isError}
            isLoading={isLoading}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
