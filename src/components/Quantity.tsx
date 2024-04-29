import { FC, PropsWithChildren, MouseEventHandler } from "react";

import "./quantity.css";

export interface Props {
  onAddClick: MouseEventHandler;
  onRemoveClick: MouseEventHandler;
  count: number;
  hasDisabledAdd: boolean;
}

const Quantity: FC<PropsWithChildren<Props>> = ({
  onAddClick,
  onRemoveClick,
  count,
  hasDisabledAdd,
}) => (
  <div className="quantity">
    {count > 0 ? (
      <>
        <button onClick={onAddClick} disabled={hasDisabledAdd}>
          Add
        </button>
        <p>{count}</p>
        <button onClick={onRemoveClick}>Remove</button>
      </>
    ) : (
      <button onClick={onAddClick}>Add</button>
    )}
  </div>
);

export default Quantity;
