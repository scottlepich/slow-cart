import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
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
  const { updateCart, cartLines, reconcile, clearReconcile } = useCart();

  const [count, setCount] = useState<number>(0); // local state count

  const [isInit, setIsInit] = useState<boolean>(true);

  const [hasDisabledAdd, setHasDisabledAdd] = useState<boolean>(false);

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
    // reconcile cartLine
    if (reconcile) {
      const cartLine = cartLines.get(id);
      if (cartLine && cartLine.quantity !== count) {
        setCount(cartLine.quantity);
        toast.success(reconcile);
        clearReconcile();
      }
    }
  }, [reconcile]);

  useEffect(() => {
    if (hasDisabledAdd && count < available) {
      setHasDisabledAdd(false);
    }
  }, [count, available, hasDisabledAdd]);

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
          count={count}
          hasDisabledAdd={hasDisabledAdd}
          onAddClick={() => handleAdd(count + 1)}
          onRemoveClick={() => setCount(count - 1)}
        />
      </div>
    </li>
  );
};

export default Product;
