import {
  createContext,
  useState,
  FC,
  PropsWithChildren,
  useEffect,
} from "react";

import useWebSocket, { SendMessage } from "react-use-websocket";

interface CartLine {
  id: number;
  name: string;
  quantity: number;
}

interface ICartContext {
  cartLines: Map<number, CartLine>;
  sendMessage: SendMessage;
  setCartLines: (cartLines: ICartContext["cartLines"]) => void;
  messages?: string[];
  reconcile?: string;
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

  const [reconcile, setReconcile] = useState<string | undefined>(undefined);

  const { sendMessage, lastMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

  useEffect(() => {
    // reconcile cart if we get a message that it changed on server
    if (lastMessage?.data) {
      const json = JSON.parse(lastMessage.data);
      setMessages((prev) => [...prev, json]);
      if (json.action === "reconcile") {
        const cartLine = cartLines.get(json.id);
        if (cartLine) {
          cartLine.quantity = json.quantity;
          cartLines.set(json.id, cartLine);
          setReconcile(
            `Inventory changed. Your cart has been updated ${cartLine.name} ${json.quantity}`,
          );
        }
        // TODO: didn't have time for this, but should update local product inventory from here
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
        clearReconcile,
        messages,
        reconcile,
        sendMessage,
        setCartLines,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
