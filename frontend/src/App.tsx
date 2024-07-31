import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./routes/RootPage";
import HomePage from "./routes/HomePage";
import ProductDetailsPage from "./routes/ProductDetailsPage";
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
       path: "/product/:id",
       element: <ProductDetailsPage /> 
      }
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
