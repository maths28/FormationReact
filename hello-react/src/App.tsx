import "./App.css";
import TodoItem from "./TodoItem.tsx";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Todo } from "./Todo.ts";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [newTodo, setNewTodo] = useState("");

  const [editingId, setEditingId] = useState("dfgfg35335");

  async function fetchTodos(): Promise<Todo[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    return data
      .map((t: any) => ({
        _id: String(t.id),
        title: t.title,
        completed: t.completed,
      }))
      .slice(0, 20);
  }

  useEffect(() => {
    (async () => {
      setTodos(await fetchTodos());
    })();
  }, []);

  useEffect(() => {
    function handleWindowClick(event: MouseEvent) {
      const target: Element = event.target as Element;
      if (target.className !== "todosInputValue") setEditingId("");
    }
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

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

  function handleTodoDelete(deletedTodo: Todo) {
    setTodos(todos.filter((todo) => todo !== deletedTodo));
  }

  function handleChangeEditingId(id: string) {
    setEditingId(id);
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
            onTodoDelete={handleTodoDelete}
            handleChangeEditingId={handleChangeEditingId}
          />
        ))}
      </div>
    </>
  );
}

export default App;
