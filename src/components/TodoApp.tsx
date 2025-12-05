import Input from "./ui/Input.tsx";
import Button from "./ui/Button.tsx";
import TodoListContainer from "./TodoListContainer.tsx";

const TodoApp = () => {
  return <div className="flex justify-center items-center w-full h-[100vh]">
    <div className="w-2/5 rounded-md p-4 flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold">Todo List</h1>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Input className="border-brand" placeholder="Add a new task" />
        <Button className="bg-brand  hover:bg-brand/80 text-white">Add</Button>
      </div>
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col gap-4">
        <div className="">
          <Input className="" placeholder="Search..." />
        </div>
        <TodoListContainer />
      </div>
    </div>
  </div>
}

export default TodoApp