import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../UI/Message";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useGetAllOrdersQuery } from "../../app/features/ordersApiEndpoints";
import { isQueryError } from "../../util/validate-error-type";
import { Link, useSearchParams } from "react-router-dom";
import Paginate from "../UI/Paginate";
import SearchBox from "../UI/SearchBox";

const AdminOrdersList = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const search = searchParams.get("keyword");
  const pageNumber = page ? parseInt(page) : 1;
  const { data, isLoading, error } = useGetAllOrdersQuery({
    page: pageNumber,
    search: search ? search : undefined,
  });

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : error && isQueryError(error) ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : data && data.orders.length ? (
        <>
          {search ? (
            <Link to="/admin/orders" className="btn btn-secondary mb-4">
              Clear search results
            </Link>
          ) : null}
          <SearchBox
            navigateUrl="/admin/orders"
            searchParam="keyword"
            placeholder="Search Orders..."
          />
          <Table striped bordered hover responsive className="table-sm my-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user?.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order.id}`}>
                      <Button type="button" variant="primary">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            page={data.page}
            pages={data.pages}
            search={search ? { param: "keyword", value: search } : null}
          />
        </>
      ) : (
        <>
          {search ? (
            <Link to="/admin/orders" className="btn btn-secondary mb-4">
              Clear search results
            </Link>
          ) : null}
          <h2>No Orders Found</h2>
        </>
      )}
    </>
  );
};

export default AdminOrdersList;
