import {useFindAllTodosQuery} from "../hooks/todo/useFindAllTodosQuery.ts";
import TodoCard from "./common/TodoCard.tsx";
import NetworkError from "./common/NetworkError.tsx";
import NetworkLoading from "./common/NetworkLoading.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store";
import {setTodos, updateTodo} from "../store/todo/todoSlice.ts";
import {useEffect, useState} from "react";
import DeleteTodoModal from "./common/DeleteTodoModal.tsx";
import type {TodoType} from "../types/todos.ts";
import EditTodoModal from "./common/EditTodoModal.tsx";

const TodoListContainer = () => {
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [todoTask, setTodoTask] = useState<TodoType>({id: 0, isLocal: false, todo: '', completed: false, userId: 0})
  const todos = useSelector((state: RootState) => state.todos)
  const {data, isError, isLoading, refetch} = useFindAllTodosQuery()
  const dispatch = useDispatch<AppDispatch>()
  const {update} = useSelector((state: RootState) => state.loading)

  function handleRemoveTodo(todo: TodoType) {
    setTodoTask(todo)
    setIsOpenRemoveModal(true)
  }

  function handleCompleteToggle(todo: TodoType) {
    setTodoTask(todo)
    dispatch(updateTodo({task: {...todo, completed: !todo.completed}}))
  }

  function handleEditTodo(todo: TodoType) {
    setTodoTask(todo)
    setIsOpenEditModal(true)
  }

  useEffect(() => {
    dispatch(setTodos(data ? data.todos : []))
  }, [data, dispatch])

  if (isError) {
    return <NetworkError onReload={() => refetch()}/>
  }

  if (isLoading) return (
    <NetworkLoading/>
  )

  return (
    <div className="flex flex-col gap-4 h-[500px] overflow-y-auto">
      {todos.length === 0 ?
        <div className="flex justify-center p-4 bg-purple-100 rounded-md">There is no todos!</div> : todos.map(todo =>
          <TodoCard
            name={todo.todo}
            key={todo.id}
            completed={todo.completed}
            onRemove={() => handleRemoveTodo(todo)}
            onCompleteToggle={() => handleCompleteToggle(todo)}
            onEdit={() => handleEditTodo(todo)}
            id={todo.id}
            selectedId={todoTask.id}
            loading={update}
          />)}
      <DeleteTodoModal isOpen={isOpenRemoveModal} onClose={setIsOpenRemoveModal} task={todoTask}/>
      <EditTodoModal isOpen={isOpenEditModal} onClose={setIsOpenEditModal} task={todoTask}/>
    </div>
  )
}

export default TodoListContainer