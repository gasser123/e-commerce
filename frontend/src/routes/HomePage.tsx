import Products from "../components/products/Products";
import { useGetProductsQuery } from "../app/features/productsApiEndpoints";
import { isQueryError } from "../util/validate-error-type";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Message from "../components/UI/Message";
const HomePage = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  let content = <></>;
  if (!products || (products && products.length === 0)) {
    content = <h2>No products found at the moment</h2>;
  } else {
    content = <Products products={products} />;
  }
  return (
    <>
      <h1>Latest products</h1>
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

export default HomePage;
