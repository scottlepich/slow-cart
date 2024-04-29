import { FC, PropsWithChildren, useEffect, useState } from "react";

import Quantity from "./Quantity";

import "./product.css";

import useCart from "../hooks/use-cart";

export interface Props {
  desc: string;
  id: number;
  name: string;
  thumbnail_url: string;
}

const Product: FC<PropsWithChildren<Props>> = ({
  desc,
  name,
  id,
  thumbnail_url,
}) => {
  const [count, setCount] = useState<number>(0); // local state count
  const [isInit, setIsInit] = useState<boolean>(true);

  const { addToCart } = useCart();

  useEffect(() => {
    setIsInit(false);
  }, []);

  useEffect(() => {
    if (!isInit) {
      addToCart(id, name, count);
    }
  }, [count]);

  return (
    <li>
      <img src={thumbnail_url} />
      <div>
        <h3>{name}</h3>
        <p>{desc}</p>
        <Quantity
          onAddClick={() => setCount(count + 1)}
          onRemoveClick={() => setCount(count - 1)}
          count={count}
        />
      </div>
    </li>
  );
};

export default Product;
