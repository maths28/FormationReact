import { ReactNode } from "react";

export default function TodoSpanValue({
  value,
  handleChangeEditingId,
}: {
  value: string;
  handleChangeEditingId: () => void;
}): ReactNode {
  return (
    <span
      className="todoSpanValue"
      onDoubleClick={() => handleChangeEditingId()}
    >
      {value}
    </span>
  );
}
