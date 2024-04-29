import { FC, PropsWithChildren, useState } from "react";

import Quantity from "./Quantity";

import "./product.css";

export interface Props {
  desc: string;
  name: string;
  thumbnail_url: string;
}

const handleAddClick = (count: number, add: (n: number) => void) => {
  add(count + 1);
};

const Product: FC<PropsWithChildren<Props>> = ({
  desc,
  name,
  thumbnail_url,
}) => {
  const [countInCart, setCountInCart] = useState<number>(0);

  return (
    <li>
      <img src={thumbnail_url} />
      <div>
        <h3>{name}</h3>
        <p>{desc}</p>
        <p>Cart: {countInCart}</p>

        <Quantity
          onClick={() => handleAddClick(countInCart, setCountInCart)}
          count={countInCart}
        />
      </div>
    </li>
  );
};

export default Product;
