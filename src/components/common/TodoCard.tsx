import Input from "../ui/Input.tsx";

const TodoCard = () => {
  return (
    <div className="flex justify-between items-center h-[75px] w-2/5 rounded-md bg-brand/10 px-4">
      <div className="flex items-center gap-2">
        <Input type="checkbox" />
        <div>name</div>
      </div>
      <div className="flex gap-2">
        <span>edit</span>
        <span>remove</span>
      </div>
    </div>
  )
}

export default TodoCard