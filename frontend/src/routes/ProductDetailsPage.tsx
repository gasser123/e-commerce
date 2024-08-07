import ProductDetails from "../components/products/ProductDetails";
import Product from "../interfaces/product.interface";
import { useLoaderData } from "react-router-dom";
const ProductDetailsPage = () => {
  const product = useLoaderData() as Product;

  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
