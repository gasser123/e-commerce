import ProductDetails from "../components/products/ProductDetails";
import { useGetProductQuery } from "../app/features/productsApiEndpoints";
import { json, useParams } from "react-router-dom";
import { isQueryError } from "../util/validate-error-type";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Message from "../components/UI/Message";
import Meta from "../components/Meta";
const ProductDetailsPage = () => {
  const params = useParams();
  const idParam = params.id;
  if (!idParam) {
    throw json({ message: "not found" }, { status: 404 });
  }
  const id = parseInt(idParam);
  const { data: product, isLoading, isError, error } = useGetProductQuery(id);

  let content = <></>;
  if (!product) {
    content = <h2>No product found at the moment</h2>;
  } else {
    content = (
      <>
        <Meta title={product.name} description={product.description} />
        <ProductDetails product={product} />
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError && isQueryError(error) ? (
        <Message variant="danger">{`Error ${error.status} ${error.data.message}`}</Message>
      ) : (
        content
      )}
    </>
  );
};

export default ProductDetailsPage;
