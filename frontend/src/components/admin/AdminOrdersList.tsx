import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../UI/Message";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useGetAllOrdersQuery } from "../../app/features/ordersApiEndpoints";
import { isQueryError } from "../../util/validate-error-type";

const AdminOrdersList = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : error && isQueryError(error) ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : orders ? (
        <Table striped bordered hover responsive className="table-sm">
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
            {orders.map((order) => (
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
      ) : null}
    </>
  );
};

export default AdminOrdersList;
