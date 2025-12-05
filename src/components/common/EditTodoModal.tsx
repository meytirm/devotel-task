import Modal from "../ui/Modal.tsx";
import Button from "../ui/Button.tsx";
import {type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store";
import {LoaderCircleIcon} from "lucide-react";
import {updateTodo} from "../../store/todo/todoSlice.ts";
import Input from "../ui/Input.tsx";
import type {TodoType} from "../../types/todos.ts";
import {z} from "zod";

const todoSchema = z.object({
  todo: z.string().min(1, "!مقدار این فیلد نمیتواند خالی باشد"),
});

const EditTodoModal = ({isOpen, onClose, task}: Props) => {
  const [todo, setTodo] = useState(task.todo)
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>()
  const {update} = useSelector((state: RootState) => state.loading)



  function handleEditTodo() {
    dispatch(updateTodo({task: {...task, todo}})).then(() => {
      onClose(false)
    })
  }

  function handleSetTodo (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.trim().length > 0) {
      setError(null)
    }
    setTodo(e.target.value)
  }

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = todoSchema.safeParse({todo});

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);
    handleEditTodo()
  }

  useEffect(() => {
    setTodo(task.todo);
  }, [task]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Todo">
      <div>
        <div>Are you sure about it?</div>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleOnSubmit}>
          <div className="w-full">
            <Input className="border-brand w-full" placeholder="Add a new task" value={todo}
                   onChange={handleSetTodo}/>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end gap-4 mt-4">
            <Button type="submit" className="bg-green-500 hover:bg-green-400 text-white" disabled={update}>
              {update ? <LoaderCircleIcon className="animate-spin"/> : 'Edit'}
            </Button>
            <Button onClick={() => onClose(false)} className="bg-gray-300 hover:bg-gray-300/80" disabled={update}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

interface Props {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  task: TodoType
}

export default EditTodoModal