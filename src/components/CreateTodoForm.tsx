import Input from "./ui/Input.tsx";
import Button from "./ui/Button.tsx";
import {LoaderCircleIcon} from "lucide-react";
import {createTodo} from "../store/todo/todoSlice.ts";
import type {AppDispatch, RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";

const CreateTodoForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.loading)

  function handleAddTodo(task: string) {
    dispatch(createTodo(task))
  }

  return (
    <form className="flex justify-center items-center gap-4 mt-4">
      <Input className="border-brand" placeholder="Add a new task"/>
      <Button onClick={() => handleAddTodo('hello test')}
              className="bg-brand hover:bg-brand/80 text-white" disabled={loading.create}>
        {loading.create ? <LoaderCircleIcon className="animate-spin"/> : <span>Add</span>}
      </Button>
    </form>
  )
}

export default CreateTodoForm