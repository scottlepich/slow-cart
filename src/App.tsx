import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import fetchProducts from "./fetch-products";

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
      <Products products={products} />
    </main>
  );
};

export default App;
