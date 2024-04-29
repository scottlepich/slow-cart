import { FC, PropsWithChildren } from "react";

export interface Props {
  onClick: (...args: any[]) => void;
  count: number;
}

const Quantity: FC<PropsWithChildren<Props>> = ({ onClick, count }) =>
  count > 0 ? <p>todo</p> : <button onClick={onClick}>Add</button>;

export default Quantity;
