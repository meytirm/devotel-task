import Input from "./ui/Input.tsx";
import TodoListContainer from "./TodoListContainer.tsx";
import CreateTodoForm from "./common/CreateTodoForm.tsx";

const TodoApp = () => {

  return <div className="flex justify-center items-center w-full">
    <div className="w-2/5 rounded-md p-4 flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold">Todo List</h1>
      <CreateTodoForm/>
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