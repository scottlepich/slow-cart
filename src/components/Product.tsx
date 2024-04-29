import { FC, PropsWithChildren, useEffect, useState } from "react";
import toast from "react-hot-toast";

import Quantity from "./Quantity";

import "./product.css";

import useCart from "../hooks/use-cart";

export interface Props {
  desc: string;
  id: number;
  name: string;
  quantity: number;
  thumbnail_url: string;
}

const Product: FC<PropsWithChildren<Props>> = ({
  desc,
  id,
  name,
  quantity: available,
  thumbnail_url,
}) => {
  const [count, setCount] = useState<number>(0); // local state count

  const [isInit, setIsInit] = useState<boolean>(true);

  const [hasDisabledAdd, setHasDisabledAdd] = useState<boolean>(false);

  const { updateCart, getLastMessage, messages } = useCart();

  useEffect(() => {
    if (isInit) {
      setIsInit(false);
    }
  }, []);

  useEffect(() => {
    if (!isInit) {
      updateCart(id, name, count);
    }
  }, [count]);

  useEffect(() => {
    if (hasDisabledAdd && count < available) {
      setHasDisabledAdd(false);
    }
  }, [count, available, hasDisabledAdd]);

  useEffect(() => {
    const message = getLastMessage();
    console.log({ messages });
  }, [messages]);

  const handleAdd = (count: number) => {
    if (count <= available) {
      setCount(count);
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
