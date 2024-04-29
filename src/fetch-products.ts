import { Props as Product } from "./components/Product";

const uri = "http://localhost:3000/api/products";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const fetchProducts = async (setProducts: (products: Product[]) => void) => {
  try {
    const response = await fetch(uri, {
      headers,
    });
    const { products } = await response.json();
    setProducts(products);
  } catch (error) {
    console.error(error);
  }
};

export default fetchProducts;
