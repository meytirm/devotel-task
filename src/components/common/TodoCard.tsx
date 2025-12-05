import Input from "../ui/Input.tsx";

const TodoCard = ({name, completed}: Props) => {
  return (
    <div className="flex justify-between items-center min-h-[75px] w-full rounded-md bg-brand/10 px-4">
      <div className="flex items-center gap-2">
        <Input type="checkbox" checked={completed} />
        <div>{name}</div>
      </div>
      <div className="flex gap-2">
        <span>edit</span>
        <span>remove</span>
      </div>
    </div>
  )
}

interface Props {
  name: string
  completed: boolean
}

export default TodoCard