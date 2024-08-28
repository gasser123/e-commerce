import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouteError, ErrorResponse } from "react-router-dom";
function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  let title = "An error occured :(";
  let message = "Something went wrong!";

  if (error.status) {
    if (error.status === 404) {
      title = "404 page not found :(";
      message = "Couldn't find resource or page.";
    } else {
      title = `Error ${error.status}`;
      message = error.data.message;
    }
  }

  return (
    <>
      <Header />
      <main>
        <h1>{title}</h1>
        <p>{message}</p>
      </main>
      <Footer />
    </>
  );
}

export default ErrorPage;
