import type { Dispatch, SetStateAction } from "react";
import type { TodoFormatType } from "../../types/todos.ts";

const TodoFormatSelect = ({ value, onChange }: Props) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TodoFormatType)}
      className="border rounded px-2 py-1"
    >
      <option value="all">All</option>
      <option value="complete">Complete</option>
      <option value="incomplete">Incomplete</option>
    </select>
  );
};

interface Props {
  value: TodoFormatType;
  onChange: Dispatch<SetStateAction<TodoFormatType>>;
}

export default TodoFormatSelect;
