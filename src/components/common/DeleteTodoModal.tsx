import Modal from "../ui/Modal.tsx";
import Button from "../ui/Button.tsx";
import type { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { LoaderCircleIcon } from "lucide-react";
import { removeTodo } from "../../store/todo/todoSlice.ts";
import type { TodoType } from "../../types/todos.ts";

const DeleteTodoModal = ({ isOpen, onClose, task }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { remove } = useSelector((state: RootState) => state.loading);

  function handleRemoveTodo() {
    dispatch(removeTodo(task)).then(() => onClose(false));
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Remove Todo">
      <div>
        <div>Are you sure about it?</div>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            onClick={handleRemoveTodo}
            className="bg-red-500 hover:bg-red-600 text-white"
            disabled={remove}
          >
            {remove ? <LoaderCircleIcon className="animate-spin" /> : "Remove"}
          </Button>
          <Button
            onClick={() => onClose(false)}
            className="bg-gray-300 hover:bg-gray-300/80"
            disabled={remove}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

interface Props {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  task: TodoType;
}

export default DeleteTodoModal;
