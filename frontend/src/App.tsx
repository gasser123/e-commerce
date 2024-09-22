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
        ],
      },

      {
        element: <AdminRoute />,
        children: [],
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
