import {useFindAllTodosQuery} from "../hooks/todo/useFindAllTodosQuery.ts";
import TodoCard from "./common/TodoCard.tsx";
import NetworkError from "./common/NetworkError.tsx";
import NetworkLoading from "./common/NetworkLoading.tsx";

const TodoListContainer = () => {
  const {data, isError, isLoading, refetch} = useFindAllTodosQuery()


  const todos = data ? data.todos : []

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