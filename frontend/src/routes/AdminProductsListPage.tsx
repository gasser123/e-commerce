import AdminProductsList from "../components/admin/AdminProductsList";
import Message from "../components/UI/Message";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useGetProductsQuery } from "../app/features/productsApiEndpoints";
import { isQueryError } from "../util/validate-error-type";
import { Row, Col, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Paginate from "../components/UI/Paginate";
const AdminProductsListPage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const pageNumber = page ? parseInt(page) : 1;
  const { data, isLoading, error } = useGetProductsQuery({ page: pageNumber });
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const setLoadingDeleteState = (value: boolean) => {
    setLoadingDelete(value);
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to="create">
            <Button className="btn-sm m-3" type="button">
              <FaEdit /> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {isLoading || loadingDelete ? (
        <LoadingSpinner />
      ) : error && isQueryError(error) ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : data ? (
        <>
          <AdminProductsList
            products={data.products}
            setLoadingDeleteState={setLoadingDeleteState}
          />
          <Paginate page={data.page} pages={data.pages} />
        </>
      ) : null}
    </>
  );
};

export default AdminProductsListPage;
