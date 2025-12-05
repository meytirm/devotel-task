import {useFindAllTodosQuery} from "../hooks/todo/useFindAllTodosQuery.ts";
import TodoCard from "./common/TodoCard.tsx";
import NetworkError from "./common/NetworkError.tsx";
import NetworkLoading from "./common/NetworkLoading.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store";
import {setTodos} from "../store/todo/todoSlice.ts";
import {useEffect} from "react";

const TodoListContainer = () => {
  const todos = useSelector((state: RootState) => state.todos)
  const dispatch = useDispatch()
  const {data, isError, isLoading, refetch} = useFindAllTodosQuery()


  useEffect(() => {
      dispatch(setTodos(data ? data.todos : []))
  }, [data, dispatch])

  if (isError) {
    return <NetworkError onReload={() => refetch()} />
  }

  if (isLoading) return (
    <NetworkLoading />
  )

  return (
    <div className="flex flex-col gap-4 h-[500px] overflow-y-auto">
      {todos.map(todo => <TodoCard name={todo.todo} key={todo.id} completed={todo.completed} />)}
    </div>
  )
}

export default TodoListContainer