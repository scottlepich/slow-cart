import { FC, PropsWithChildren, useEffect, useState } from "react";
import toast from "react-hot-toast";

import Quantity from "./Quantity";

import "./product.css";

import useCart from "../hooks/use-cart";

export interface Props {
  quantity: number;
  desc: string;
  id: number;
  name: string;
  thumbnail_url: string;
}

const Product: FC<PropsWithChildren<Props>> = ({
  quantity: available,
  desc,
  name,
  id,
  thumbnail_url,
}) => {
  const [count, setCount] = useState<number>(0); // local state count

  const [hasDisabledAdd, setHasDisabledAdd] = useState<boolean>(false);

  useEffect(() => {
    if (hasDisabledAdd && count < available) {
      setHasDisabledAdd(false);
    }
  }, [count, available, hasDisabledAdd]);

  const { updateCart } = useCart();

  const handleAdd = (count: number) => {
    if (count <= available) {
      setCount(count);
      updateCart(id, name, count);
    } else {
      toast.error(`Only ${available} ${name} available.`);
      setHasDisabledAdd(true);
    }
  };

  return (
    <li>
      <img src={thumbnail_url} />
      <div>
        <h3>{name}</h3>
        <p>{desc}</p>
        <Quantity
          onAddClick={() => handleAdd(count + 1)}
          onRemoveClick={() => setCount(count - 1)}
          count={count}
          hasDisabledAdd={hasDisabledAdd}
        />
      </div>
    </li>
  );
};

export default Product;
