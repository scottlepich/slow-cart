// import useWebSocket from 'react-use-websocket';

import { useContext, useState, useEffect } from "react";

import toast from "react-hot-toast";

import { CartContext } from "../cart";

const useCart = () => {
  const { cartLines, setCartLines } = useContext(CartContext);
  // const WS_URL = 'ws://127.0.0.1:8000';

  //   useWebSocket(WS_URL, {
  //     onOpen: () => {
  //       console.log('WebSocket connection established.');
  //     },
  //   });

  const addToCart = (id: number, name: string, quantity: number) => {
    // TODO: debouce
    // TODO: socket
    toast.success(`Updated ${name}. Count is ${quantity}.`);
    setCartLines(cartLines.set(id, { name, quantity }));
    console.log({ id, cartLines });
  };

  return {
    addToCart,
  };
};

export default useCart;
