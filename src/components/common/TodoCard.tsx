import Input from "../ui/Input.tsx";
import {SquarePenIcon, Trash2Icon} from "lucide-react";

const TodoCard = ({name, completed}: Props) => {
  return (
    <div className="flex justify-between items-center min-h-[75px] w-full rounded-md bg-brand/10 px-4">
      <div className="flex items-center gap-2">
        <Input type="checkbox" checked={completed} />
        <div>{name}</div>
      </div>
      <div className="flex items-center gap-2">
        <span><SquarePenIcon size={16} className="text-blue-400" /></span>
        <span><Trash2Icon size={16} className="text-red-400" /></span>
      </div>
    </div>
  )
}

interface Props {
  name: string
  completed: boolean
}

export default TodoCard