import "./App.css";
import TodoItem from "./TodoItem.tsx";
import { ChangeEvent, FormEvent, useState } from "react";
import { Todo } from "./Todo.ts";

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { _id: "abcdef1234", title: "ABC", completed: false },
    { _id: "dngudtub45", title: "DEF", completed: true },
    { _id: "dfgfg35335", title: "XYZ", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const editingId = "dfgfg35335";

  function onChangeValueNewTodo(event: ChangeEvent<HTMLInputElement>): void {
    setNewTodo(event.target.value);
  }

  function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTodos([
      ...todos,
      { _id: Math.random().toString(), title: newTodo, completed: false },
    ]);
    setNewTodo("");
  }

  function onChangeSelectAll(event: ChangeEvent<HTMLInputElement>) {
    setTodos(
      todos.map((todo: Todo) => {
        return { ...todo, completed: event.target.checked };
      }),
    );
  }

  function handleTodoEdit(editedTodo: Todo) {
    const newTodos: Todo[] = [...todos];
    const indexOfEditedTodo = newTodos.findIndex(
      (todo: Todo) => todo._id === editedTodo._id,
    );
    newTodos[indexOfEditedTodo] = editedTodo;
    setTodos(newTodos);
  }

  return (
    <>
      <form className="todos-form" onSubmit={onSubmitForm}>
        <input
          type="checkbox"
          className="todos-toggle-checked"
          onChange={onChangeSelectAll}
        />
        <input
          type="text"
          className="todos-new-input"
          value={newTodo}
          onChange={onChangeValueNewTodo}
        />
        <button>+</button>
      </form>
      <div className="todos-container">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            isEditing={editingId === todo._id}
            handleTodoEdit={handleTodoEdit}
          />
        ))}
      </div>
    </>
  );
}

export default App;
