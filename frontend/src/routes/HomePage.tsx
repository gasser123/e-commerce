import Products from "../components/products/Products";
import { useGetProductsQuery } from "../app/features/productsApiEndpoints";
import { isQueryError } from "../util/validate-error-type";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Message from "../components/UI/Message";
import { useSearchParams } from "react-router-dom";
import Paginate from "../components/UI/Paginate";
const HomePage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const pageNumber = page ? parseInt(page) : 1;
  const { data, isLoading, isError, error } = useGetProductsQuery(pageNumber);
  let content = <></>;
  if (!data || (data && data.products.length === 0)) {
    content = <h2>No products found at the moment</h2>;
  } else {
    content = <Products products={data.products} />;
  }
  return (
    <>
      <h1>Latest products</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError && isQueryError(error) ? (
        <Message variant="danger">{`Error ${error.status} ${error.data.message}`}</Message>
      ) : (
        <>
          {content}
          {data ? <Paginate page={data.page} pages={data.pages} /> : null}
        </>
      )}
    </>
  );
};

export default HomePage;
