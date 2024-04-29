import { FC, PropsWithChildren, useState } from "react";

import Quantity from "./Quantity";

import "./product.css";

export interface Props {
  desc: string;
  name: string;
}

const handleAddClick = (count: number, add: (n: number) => void) => {
  add(count + 1);
};

const Product: FC<PropsWithChildren<Props>> = ({ name, desc }) => {
  const [countInCart, setCountInCart] = useState<number>(0);

  return (
    <li>
      <h3>{name}</h3>
      <p>{desc}</p>
      <p>Added: {countInCart}</p>
      <Quantity
        onClick={() => handleAddClick(countInCart, setCountInCart)}
        count={countInCart}
      >
        Add
      </Quantity>
    </li>
  );
};

export default Product;
