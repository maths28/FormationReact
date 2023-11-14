import { ReactNode } from "react";

export default function TodoSpanValue({ value }: { value: string }): ReactNode {
  return <span className="todoSpanValue">{value}</span>;
}
