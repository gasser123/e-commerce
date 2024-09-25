import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./routes/RootPage";
import HomePage from "./routes/HomePage";
import ProductDetailsPage from "./routes/ProductDetailsPage";
import ErrorPage from "./routes/ErrorPage";
import CartPage from "./routes/CartPage";
import LoginPage from "./routes/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./routes/RegisterPage";
import ShippingPage from "./routes/ShippingPage";
import PrivateRoute from "./routes/PrivateRoute";
import PaymentPage from "./routes/PaymentPage";
import PlaceOrderPage from "./routes/PlaceOrderPage";
import AdminRoute from "./routes/AdminRoute";
import OrderPage from "./routes/OrderPage";
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import ProfilePage from "./routes/ProfilePage";
import AdminOrdersListPage from "./routes/AdminOrdersListPage";
import AdminProductsListPage from "./routes/AdminProductsListPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },

      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/shipping",
            element: <ShippingPage />,
          },
          {
            path: "/payment",
            element: <PaymentPage />,
          },
          {
            path: "/placeorder",
            element: <PlaceOrderPage />,
          },
          {
            path: "/orders/:id",
            element: <OrderPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },

      {
        element: <AdminRoute />,
        children: [
          {
            path: "/admin/orders",
            element: <AdminOrdersListPage />,
          },
          {
            path: "/admin/products",
            element: <AdminProductsListPage />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
function App() {
  const initialPayPalOptions: ReactPayPalScriptOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };
  return (
    <PayPalScriptProvider deferLoading={true} options={initialPayPalOptions}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  );
}

export default App;
