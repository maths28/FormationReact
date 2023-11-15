import { ReactNode } from "react";

export default function TodoInputValue({
  value,
}: {
  value: string;
}): ReactNode {
  return <input className="todosInputValue" defaultValue={value} />;
}
