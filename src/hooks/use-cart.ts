import { useContext, useState, useEffect } from "react";

import toast from "react-hot-toast";

import { CartContext } from "../cart";

const useCart = () => {
  const { cartLines, setCartLines, sendMessage, messages } =
    useContext(CartContext);

  const updateCart = (id: number, name: string, quantity: number) => {
    console.log({ id, quantity });
    sendMessage(
      JSON.stringify({
        action: "update cart",
        id,
        name,
        quantity,
      }),
    );
    toast.success(`Updated ${name}. Count is ${quantity}.`);
    setCartLines(cartLines.set(id, { name, quantity }));
  };

  const getMessages = () => messages;

  return {
    getMessages,
    updateCart,
  };
};

export default useCart;
