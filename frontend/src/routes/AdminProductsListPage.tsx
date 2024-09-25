import AdminProductsList from "../components/admin/AdminProductsList";
import Message from "../components/UI/Message";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useGetProductsQuery } from "../app/features/productsApiEndpoints";
import { isQueryError } from "../util/validate-error-type";
import { Row, Col, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
const AdminProductsListPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

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
      {isLoading ? (
        <LoadingSpinner />
      ) : error && isQueryError(error) ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : products ? (
        <AdminProductsList products={products} />
      ) : null}
    </>
  );
};

export default AdminProductsListPage;
