import {
  createContext,
  useState,
  FC,
  PropsWithChildren,
  useEffect,
} from "react";

import useWebSocket, { SendMessage } from "react-use-websocket";

interface CartLine {
  name: string;
  quantity: number;
}

interface ICartContext {
  cartLines: Map<number, CartLine>;
  sendMessage: SendMessage;
  setCartLines: (cartLines: ICartContext["cartLines"]) => void;
  messages?: string[];
  reconcile?: CartLine;
  clearReconcile: () => void;
}

const WS_URL = "ws://localhost:3000";

export const CartContext = createContext<ICartContext>({
  cartLines: new Map<number, CartLine>(),
  sendMessage: () => undefined,
  setCartLines: () => undefined,
  clearReconcile: () => undefined,
});

export const CartContextProvider: FC<PropsWithChildren<never>> = ({
  children,
}) => {
  const [cartLines, setCartLines] = useState<ICartContext["cartLines"]>(
    new Map(),
  );

  const [messages, setMessages] = useState<string[]>([]);

  const [reconcile, setReconcile] = useState<any>(undefined);

  const { sendMessage, lastMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

  useEffect(() => {
    if (lastMessage?.data) {
      const json = JSON.parse(lastMessage.data);
      setMessages((prev) => [...prev, json]);
      if (json.action === "reconcile") {
        setReconcile(json);
      }
    }
  }, [lastMessage]);

  const clearReconcile = () => {
    setReconcile(undefined);
  };

  return (
    <CartContext.Provider
      value={{
        cartLines,
        setCartLines,
        sendMessage,
        messages,
        reconcile,
        clearReconcile,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
