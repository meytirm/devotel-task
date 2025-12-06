import {
  CheckIcon,
  LoaderCircleIcon,
  SquarePenIcon,
  Trash2Icon,
} from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TodoCard = ({
  name,
  completed,
  onRemove,
  onEdit,
  onCompleteToggle,
  id,
  selectedId,
  loading,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      className="flex justify-between items-center min-h-[75px] w-full rounded-md bg-brand/10 px-4 cursor-move active:cursor-grabbing"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-2">
        {id === selectedId && loading ? (
          <LoaderCircleIcon className="animate-spin text-brand" />
        ) : (
          <CheckIcon
            size={20}
            className={`${completed ? "text-green-400" : "text-gray-300"} cursor-pointer`}
            onMouseDown={onCompleteToggle}
          />
        )}
        <div className={completed ? "line-through text-gray-500" : "font-bold"}>
          {name}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span onMouseDown={onEdit} className="cursor-pointer">
          <SquarePenIcon size={16} className="text-blue-400" />
        </span>
        <span onMouseDown={onRemove} className="cursor-pointer">
          <Trash2Icon size={16} className="text-red-400" />
        </span>
      </div>
    </div>
  );
};

interface Props {
  name: string;
  completed: boolean;
  onRemove: () => void;
  onEdit: () => void;
  onCompleteToggle: () => void;
  selectedId: number;
  id: number;
  loading: boolean;
}

export default TodoCard;
