import { useContext } from "react";

import { CartContext } from "../cart";

import useDebounce from "./use-debounce";

const DEBOUNCE_WINDOW = 0.5e3;

const useCart = () => {
  const { cartLines, clearReconcile, messages, reconcile, sendMessage } =
    useContext(CartContext);

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
