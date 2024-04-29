import { FC, PropsWithChildren } from "react";

import Product, { Props as ProductProps } from "./Product";

export interface Props {
  products: ProductProps[];
}

const Products: FC<PropsWithChildren<Props>> = ({ products }) =>
  products.length > 0 && (
    <ul>
      {products.map((product, index) => (
        <Product key={`product-${index}`} {...product} />
      ))}
    </ul>
  );

export default Products;
