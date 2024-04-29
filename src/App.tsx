import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import fetchProducts from "./fetch-products";

import { CartContextProvider } from "./cart";
import Products from "./components/Products";
import { Props as Product } from "./components/Product";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts(setProducts);
  }, []);

  return (
    <main>
      <Toaster position="bottom-left" reverseOrder />
      <CartContextProvider>
        <Products products={products} />
      </CartContextProvider>
    </main>
  );
};

export default App;
