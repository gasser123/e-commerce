import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import Message from "../components/UI/Message";
const AdminRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Message variant="danger">{`Error ${403} Forbidden resource`}</Message>
  );
};

export default AdminRoute;
