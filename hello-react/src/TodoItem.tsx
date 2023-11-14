import { ReactNode } from "react";
import TodoSpanValue from "./TodoSpanValue.tsx";
import TodoInputValue from "./TodoInputValue.tsx";

export default function TodoItem({
  todo,
  isEditing = false,
}: {
  todo: { _id: string; title: string; completed: boolean };
  isEditing?: boolean;
}): ReactNode {
  return (
    <div className="todosItem" data-todo-id={todo._id}>
      <input
        type="checkbox"
        className="todosCompleted"
        checked={todo.completed ?? false}
      />
      {isEditing && <TodoInputValue value={todo.title} />}
      {!isEditing && <TodoSpanValue value={todo.title} />}
      <button className="todosDeleteBtn">-</button>
    </div>
  );
}
