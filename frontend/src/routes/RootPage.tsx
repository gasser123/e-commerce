import { Container } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authSlice from "../app/features/authSlice";
import { useAppDispatch } from "../app/hook";
const RootPage = () => {
  const { logout } = authSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (!tokenExpiration) {
      dispatch(logout());
      return;
    }
    const expirationTime = Number(tokenExpiration);
    const checkTokenExpiration = () => {
      const now = Date.now();
      if (now >= expirationTime) {
        alert("Session expired, logging out!");
        dispatch(logout());
        navigate("/");
      }
    };

    // Check token expiration every minute (60000ms)
    setInterval(checkTokenExpiration, 60000);
  }, [dispatch, logout, navigate]);
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default RootPage;
