import { ChangeEvent, ReactNode } from "react";
import TodoSpanValue from "./TodoSpanValue.tsx";
import TodoInputValue from "./TodoInputValue.tsx";
import { Todo } from "./Todo.ts";

export default function TodoItem({
  todo,
  isEditing = false,
  handleTodoEdit,
  onTodoDelete,
  handleChangeEditingId,
}: {
  todo: { _id: string; title: string; completed: boolean };
  isEditing?: boolean;
  handleTodoEdit: (todo: Todo) => void;
  onTodoDelete: (deletedTodo: Todo) => void;
  handleChangeEditingId: (id: string) => void;
}): ReactNode {
  return (
    <div className="todosItem" data-todo-id={todo._id}>
      <input
        type="checkbox"
        className="todosCompleted"
        checked={todo.completed ?? false}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleTodoEdit({ ...todo, completed: e.target.checked })
        }
      />
      {isEditing && (
        <TodoInputValue
          value={todo.title}
          handleTodoEdit={(val: string) =>
            handleTodoEdit({ ...todo, title: val })
          }
          handleChangeEditingId={handleChangeEditingId}
        />
      )}
      {!isEditing && (
        <TodoSpanValue
          value={todo.title}
          handleChangeEditingId={() => handleChangeEditingId(todo._id)}
        />
      )}
      <button className="todosDeleteBtn" onClick={() => onTodoDelete(todo)}>
        -
      </button>
    </div>
  );
}
