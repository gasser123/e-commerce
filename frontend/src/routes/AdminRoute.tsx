import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import Message from "../components/UI/Message";
import Meta from "../components/Meta";
const AdminRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <>
      <Meta title="Admin" />
      <Outlet />
    </>
  ) : (
    <Message variant="danger">{`Error ${403} Forbidden resource`}</Message>
  );
};

export default AdminRoute;
