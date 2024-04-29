import { FC, PropsWithChildren, MouseEventHandler } from "react";

import "./quantity.css";

export interface Props {
  onAddClick: MouseEventHandler;
  onRemoveClick: MouseEventHandler;
  count: number;
}

const Quantity: FC<PropsWithChildren<Props>> = ({
  onAddClick,
  onRemoveClick,
  count,
}) => (
  <div className="quantity">
    {count > 0 ? (
      <>
        <button onClick={onAddClick}>Add</button>
        <p>{count}</p>
        <button onClick={onRemoveClick}>Remove</button>
      </>
    ) : (
      <button onClick={onAddClick}>Add</button>
    )}
  </div>
);

export default Quantity;
