import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TodoCard from "./common/TodoCard.tsx";
import type { TodoType } from "../types/todos.ts";
import { reorderTodos } from "../store/todo/todoSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

const TodoListContainerDraggable = ({
  todos,
  selectedId,
  onEdit,
  onCompleteToggle,
  onRemove,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { update } = useSelector((state: RootState) => state.loading);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((t) => t.id === active.id);
    const newIndex = todos.findIndex((t) => t.id === over.id);

    dispatch(reorderTodos({ oldIndex, newIndex }));
  };
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={todos.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            onRemove={() => onRemove(todo)}
            onCompleteToggle={() => onCompleteToggle(todo)}
            onEdit={() => onEdit(todo)}
            selectedId={selectedId}
            loading={update}
            todo={todo}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

interface Props {
  todos: TodoType[];
  onRemove: (todo: TodoType) => void;
  onCompleteToggle: (todo: TodoType) => void;
  onEdit: (todo: TodoType) => void;
  selectedId: number;
}

export default TodoListContainerDraggable;
