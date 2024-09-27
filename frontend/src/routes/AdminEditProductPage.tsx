import AdminEditProduct from "../components/admin/AdminEditProduct";
import { useGetProductQuery } from "../app/features/productsApiEndpoints";
import Message from "../components/UI/Message";
import { json, useParams } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { isQueryError } from "../util/validate-error-type";
const AdminEditProductPage = () => {
  const { id } = useParams();
  if (!id) {
    throw json({ message: "product id not found" }, { status: 404 });
  }
  const { data: product, isLoading, error } = useGetProductQuery(parseInt(id));
  return isLoading ? (
    <LoadingSpinner />
  ) : error && isQueryError(error) ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : product ? (
    <AdminEditProduct product={product} />
  ) : null;
};

export default AdminEditProductPage;
