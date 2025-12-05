import Input from "./ui/Input.tsx";
import Button from "./ui/Button.tsx";
import TodoListContainer from "./TodoListContainer.tsx";
import {createTodo} from "../store/todo/todoSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store";
import {LoaderCircleIcon} from "lucide-react";

const TodoApp = () => {
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.loading)

  function handleAddTodo(task: string) {
    dispatch(createTodo(task))
  }

  return <div className="flex justify-center items-center w-full">
    <div className="w-2/5 rounded-md p-4 flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold">Todo List</h1>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Input className="border-brand" placeholder="Add a new task"/>
        <Button onClick={() => handleAddTodo('hello test')}
                className="bg-brand hover:bg-brand/80 text-white" disabled={loading.create}>
          {loading.create ? <LoaderCircleIcon className="animate-spin"/> : <span>Add</span>}
        </Button>
      </div>
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col gap-4">
        <div className="">
          <Input className="" placeholder="Search..."/>
        </div>
        <TodoListContainer/>
      </div>
    </div>
  </div>
}

export default TodoApp