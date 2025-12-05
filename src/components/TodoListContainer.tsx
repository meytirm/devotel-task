import TodoCard from "./common/TodoCard.tsx";
import NetworkError from "./common/NetworkError.tsx";
import NetworkLoading from "./common/NetworkLoading.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store";
import {reorderTodos, updateTodo} from "../store/todo/todoSlice.ts";
import {useState} from "react";
import DeleteTodoModal from "./common/DeleteTodoModal.tsx";
import type {TodoType} from "../types/todos.ts";
import EditTodoModal from "./common/EditTodoModal.tsx";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";

const TodoListContainer = ({todos, refetch, isError, isLoading}: Props) => {
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [todoTask, setTodoTask] = useState<TodoType>({id: 0, isLocal: false, todo: '', completed: false, userId: 0})
  const dispatch = useDispatch<AppDispatch>()
  const {update} = useSelector((state: RootState) => state.loading)

  function handleRemoveTodo(todo: TodoType) {
    setTodoTask(todo)
    setIsOpenRemoveModal(true)
  }

  function handleCompleteToggle(todo: TodoType) {
    setTodoTask(todo)
    dispatch(updateTodo({task: {...todo, completed: !todo.completed}}))
  }

  function handleEditTodo(todo: TodoType) {
    setTodoTask(todo)
    setIsOpenEditModal(true)
  }

  if (isError) {
    return <NetworkError onReload={() => refetch()}/>
  }

  if (isLoading) return (
    <NetworkLoading/>
  )


  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex(t => t.id === active.id);
    const newIndex = todos.findIndex(t => t.id === over.id);

    dispatch(reorderTodos({ oldIndex, newIndex }));
  };

  return (
    <div className="flex flex-col gap-4 h-[500px] overflow-y-auto">
      {todos.length === 0 ?
        <div className="flex justify-center p-4 bg-purple-100 rounded-md">There is no todos!</div> :
        <DndContext collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={todos.map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {todos.map(todo =>
              <TodoCard
                name={todo.todo}
                key={todo.id}
                completed={todo.completed}
                onRemove={() => handleRemoveTodo(todo)}
                onCompleteToggle={() => handleCompleteToggle(todo)}
                onEdit={() => handleEditTodo(todo)}
                id={todo.id}
                selectedId={todoTask.id}
                loading={update}
              />)}
          </SortableContext>
        </DndContext>
      }
      <DeleteTodoModal isOpen={isOpenRemoveModal} onClose={setIsOpenRemoveModal} task={todoTask}/>
      <EditTodoModal isOpen={isOpenEditModal} onClose={setIsOpenEditModal} task={todoTask}/>
    </div>
  )
}

interface Props {
  todos: TodoType[]
  isError: boolean
  isLoading: boolean
  refetch: () => void
}

export default TodoListContainer