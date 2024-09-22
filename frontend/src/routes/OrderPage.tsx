import Order from "../components/orders/Order";
import Message from "../components/UI/Message";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useGetOrderDetailsQuery } from "../app/features/ordersApiEndpoints";
import { json, useParams } from "react-router-dom";
import { isQueryError } from "../util/validate-error-type";
const OrderPage = () => {
  const params = useParams();
  const idParam = params.id;
  if (!idParam) {
    throw json({ message: "not found" }, { status: 404 });
  }
  const id = parseInt(idParam);
  const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(id);

  return isLoading ? (
    <LoadingSpinner />
  ) : error && isQueryError(error) ? (
    <Message variant="danger">{`Error ${error.status} ${error.data.message}`}</Message>
  ) : order ? (
    <Order order={order} refetch={refetch} />
  ) : null;
};

export default OrderPage;
