import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./routes/RootPage";
import HomePage from "./routes/HomePage";
import ProductDetailsPage from "./routes/ProductDetailsPage";
import ErrorPage from "./routes/ErrorPage";
import CartPage from "./routes/CartPage";
import LoginPage from "./routes/LoginPage";
 import 'react-toastify/dist/ReactToastify.css';
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
    ],
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
