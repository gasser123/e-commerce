import Products from "../components/products/Products";
import { useLoaderData } from "react-router-dom";
import Product from "../interfaces/product.interface";
const HomePage = () => {
  const products = useLoaderData() as Product[];

  return (
    <>
      <h1>Latest products</h1>
      <Products products={products} />
    </>
  );
};

export default HomePage;
