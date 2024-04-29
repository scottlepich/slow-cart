import { createContext, useState, FC, PropsWithChildren } from "react";

interface CartLine {
  name: string;
  quantity: number;
}

interface ICartContext {
  cartLines: Map<number, CartLine>;
  setCartLines: (cartLines: ICartContext["cartLines"]) => void;
}

export const CartContext = createContext<ICartContext>({
  cartLines: new Map<number, CartLine>(),
  setCartLines: () => undefined,
});

export const CartContextProvider: FC<PropsWithChildren<never>> = ({
  children,
}) => {
  const [cartLines, setCartLines] = useState<ICartContext["cartLines"]>(
    new Map(),
  );

  return (
    <CartContext.Provider value={{ cartLines, setCartLines }}>
      {children}
    </CartContext.Provider>
  );
};
