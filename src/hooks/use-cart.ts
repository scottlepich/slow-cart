import { useContext, useState, useEffect } from "react";

import toast from "react-hot-toast";

import { CartContext } from "../cart";

import useDebounce from "./use-debounce";

const DEBOUNCE_WINDOW = 0.5e3;

const useCart = () => {
  const {
    cartLines,
    clearReconcile,
    messages,
    reconcile,
    sendMessage,
    setCartLines,
  } = useContext(CartContext);

  const updateCart = useDebounce(
    (id: number, name: string, quantity: number) => {
      sendMessage(
        JSON.stringify({
          action: "cart-update",
          id,
          name,
          quantity,
        }),
      );
      toast.success(`Updated ${name}. Count is ${quantity}.`);
      setCartLines(cartLines.set(id, { id, name, quantity }));
    },
    DEBOUNCE_WINDOW,
  );

  return {
    cartLines,
    clearReconcile,
    messages,
    reconcile,
    updateCart,
  };
};

export default useCart;
