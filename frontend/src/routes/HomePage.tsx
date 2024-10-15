import Products from "../components/products/Products";
import { useGetProductsQuery } from "../app/features/productsApiEndpoints";
import { isQueryError } from "../util/validate-error-type";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Message from "../components/UI/Message";
import { Link, useSearchParams } from "react-router-dom";
import Paginate from "../components/UI/Paginate";
import ProductCarousel from "../components/products/ProductCarousel";
import Meta from "../components/Meta";
const HomePage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const pageNumber = page ? parseInt(page) : 1;
  const { data, isLoading, isError, error } = useGetProductsQuery({
    page: pageNumber,
    search: search ? search : undefined,
  });
  let content = <></>;
  if (!data || (data && data.products.length === 0)) {
    content = <h2>No products found at the moment</h2>;
  } else {
    content = <Products products={data.products} />;
  }
  return (
    <>
      {search ? (
        <Link to="/" className="btn btn-secondary mb-4">
          Go Back
        </Link>
      ) : (
        <>
          <ProductCarousel />
          <h1>Latest products</h1>
        </>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : isError && isQueryError(error) ? (
        <Message variant="danger">{`Error ${error.status} ${error.data.message}`}</Message>
      ) : (
        <>
          <Meta />
          {content}
          {data ? (
            <Paginate page={data.page} pages={data.pages} search={search} />
          ) : null}
        </>
      )}
    </>
  );
};

export default HomePage;
