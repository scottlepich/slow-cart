import { Props as Product } from "./components/Product";

const fetchProducts = async (setProducts: (products: Product[]) => void) => {
  try {
    const response = await fetch("http://localhost:3000/api/products", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const { products } = await response.json();
    setProducts(products);
  } catch (error) {
    console.error(error);
  }
};

export default fetchProducts;
