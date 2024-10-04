import { json, useParams } from "react-router-dom";
import { useGetUserQuery } from "../app/features/usersApiEndpoints";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { isQueryError } from "../util/validate-error-type";
import Message from "../components/UI/Message";
import AdminEditUser from "../components/admin/AdminEditUser";
const AdminEditUserPage = () => {
  const { id } = useParams();
  if (!id) {
    throw json({ message: "id param missing" }, { status: 400 });
  }
  const { data: user, isLoading, error } = useGetUserQuery(parseInt(id));
  return isLoading ? (
    <LoadingSpinner />
  ) : error && isQueryError(error) ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : user ? (
    <AdminEditUser user={user} />
  ) : null;
};

export default AdminEditUserPage;
