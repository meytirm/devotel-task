import Input from "../ui/Input.tsx";
import Button from "../ui/Button.tsx";
import {LoaderCircleIcon} from "lucide-react";
import {createTodo} from "../../store/todo/todoSlice.ts";
import type {AppDispatch, RootState} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {z} from "zod";
import {type ChangeEvent, type FormEvent, useState} from "react";

const todoSchema = z.object({
  todo: z.string().min(1, "!مقدار این فیلد نمیتواند خالی باشد"),
});
const CreateTodoForm = () => {
  const [todo, setTodo] = useState('')
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>()
  const {create} = useSelector((state: RootState) => state.loading)

  function handleAddTodo(task: string) {
    dispatch(createTodo(task)).then(() =>
      setTodo(''))
  }

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = todoSchema.safeParse({todo});

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);
    handleAddTodo(result.data.todo)
  }

  function handleSetTodo (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.trim().length > 0) {
      setError(null)
    }
    setTodo(e.target.value)
  }


  return (
    <form className="flex flex-col justify-center items-center gap-4 mt-4" onSubmit={handleOnSubmit}>
      <div className="flex justify-center items-center gap-4">
        <Input className="border-brand" placeholder="Add a new task" value={todo}
               onChange={handleSetTodo}/>
        <Button
          className="bg-brand hover:bg-brand/80 text-white" disabled={create} type="submit">
          {create ? <LoaderCircleIcon className="animate-spin"/> : <span>Add</span>}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}

export default CreateTodoForm