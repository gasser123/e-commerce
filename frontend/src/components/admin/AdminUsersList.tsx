import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../UI/Message";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../app/features/usersApiEndpoints";
import {
  isCustomErrorResponse,
  isFetchBaseQueryError,
  isQueryError,
} from "../../util/validate-error-type";
import { toast } from "react-toastify";
import { useEffect } from "react";
const AdminUsersList = () => {
  const { data: users, isLoading, error } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: loadingDelete, error: deleteError }] =
    useDeleteUserMutation();
  useEffect(() => {
    if (deleteError && isQueryError(deleteError)) {
      toast.error(deleteError.data.message);
    }
  }, [deleteError]);
  const deleteHandler = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("user deleted successfully");
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const { data } = error;
          if (isCustomErrorResponse(data)) {
            if (typeof data.message === "string") {
              toast.error(data.message);
            } else {
              data.message.forEach((element) => toast.error(element));
            }
          }
        } else if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    }
  };
  return (
    <>
      <h1>Users</h1>
      {isLoading || loadingDelete ? (
        <LoadingSpinner />
      ) : error && isQueryError(error) ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : users ? (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user.id}/edit`}>
                    <Button type="button" variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    type="button"
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      deleteHandler(user.id);
                    }}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};

export default AdminUsersList;
