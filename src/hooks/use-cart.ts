import { useContext, useState, useEffect } from "react";

import toast from "react-hot-toast";

import { CartContext } from "../cart";

const useCart = () => {
  const { cartLines, setCartLines, sendMessage } = useContext(CartContext);

  const addToCart = (id: number, name: string, quantity: number) => {
    // TODO: debouce

    sendMessage(`update ${name} to ${quantity}`);

    toast.success(`Updated ${name}. Count is ${quantity}.`);
    setCartLines(cartLines.set(id, { name, quantity }));
    console.log({ id, cartLines });
  };

  return {
    addToCart,
  };
};

export default useCart;
