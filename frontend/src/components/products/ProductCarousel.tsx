import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import LoadingSpinner from "../UI/LoadingSpinner";
import Message from "../UI/Message";
import { useGetTopProductsQuery } from "../../app/features/productsApiEndpoints";
import { isQueryError } from "../../util/validate-error-type";
import classes from "./ProductCarousel.module.css";
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <LoadingSpinner />
  ) : error && isQueryError(error) ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : products && products.length ? (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product.id}>
          <Link to={`/products/${product.id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className={classes["carousel-caption"]}>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  ) : null;
};

export default ProductCarousel;
