import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./routes/RootPage";
import HomePage from "./routes/HomePage";
import ProductDetailsPage from "./routes/ProductDetailsPage";
import { loader as productsLoader } from "./routes/loaders/products.loader";
import { loader as productDetailsLoader } from "./routes/loaders/productDetails.loader";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: productsLoader,
      },
      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
        loader: productDetailsLoader,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
