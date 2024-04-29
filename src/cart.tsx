import { createContext, useState, FC, PropsWithChildren } from "react";
import useWebSocket, { SendMessage } from "react-use-websocket";

interface CartLine {
  name: string;
  quantity: number;
}

interface ICartContext {
  cartLines: Map<number, CartLine>;
  sendMessage: SendMessage;
  setCartLines: (cartLines: ICartContext["cartLines"]) => void;
}

const WS_URL = "ws://localhost:3000";

export const CartContext = createContext<ICartContext>({
  cartLines: new Map<number, CartLine>(),
  sendMessage: () => undefined,
  setCartLines: () => undefined,
});

export const CartContextProvider: FC<PropsWithChildren<never>> = ({
  children,
}) => {
  const [cartLines, setCartLines] = useState<ICartContext["cartLines"]>(
    new Map(),
  );

  const { sendMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

  return (
    <CartContext.Provider value={{ cartLines, setCartLines, sendMessage }}>
      {children}
    </CartContext.Provider>
  );
};
