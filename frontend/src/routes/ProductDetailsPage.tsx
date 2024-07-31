import { useParams } from "react-router-dom";
import products from "../products";
import { json } from "react-router-dom";
import ProductDetails from "../components/products/ProductDetails";
const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  if (!productId) {
    throw json({ message: "page not found" }, { status: 404 });
  }
  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) {
    throw json({ message: "page not found" }, { status: 404 });
  }
  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
