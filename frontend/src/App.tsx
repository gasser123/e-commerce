import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./routes/RootPage";
import HomePage from "./routes/HomePage";
import ProductDetailsPage from "./routes/ProductDetailsPage";
import ErrorPage from "./routes/ErrorPage";
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
    ],
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
