import { ChangeEvent, ReactNode, KeyboardEvent } from "react";

export default function TodoInputValue({
  value,
  handleTodoEdit,
  handleChangeEditingId,
}: {
  value: string;
  handleTodoEdit: (value: string) => void;
  handleChangeEditingId: (id: string) => void;
}): ReactNode {
  function handleKeydown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.code === "Enter") handleChangeEditingId("");
  }

  return (
    <input
      className="todosInputValue"
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        handleTodoEdit(event.target.value)
      }
      onKeyDown={handleKeydown}
    />
  );
}
