import { FC, PropsWithChildren, MouseEventHandler } from "react";

export interface Props {
  onAddClick: MouseEventHandler;
  onRemoveClick: MouseEventHandler;
  count: number;
}

const Quantity: FC<PropsWithChildren<Props>> = ({
  onAddClick,
  onRemoveClick,
  count,
}) =>
  count > 0 ? (
    <>
      <button onClick={onAddClick}>Add</button>
      <p>{count}</p>
      <button onClick={onRemoveClick}>Remove</button>
    </>
  ) : (
    <button onClick={onAddClick}>Add</button>
  );

export default Quantity;
