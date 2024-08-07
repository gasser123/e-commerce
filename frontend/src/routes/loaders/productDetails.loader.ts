import { json, LoaderFunction } from "react-router-dom";
import { SERVER_URL } from "../../config";
export const loader: LoaderFunction = async (loaderArgs) => {
  const { params } = loaderArgs;
  const id = params.id;
  if (!id) {
    throw json({ message: "resource not found" }, { status: 404 });
  }
  const response = await fetch(`${SERVER_URL}/products/${id}`);
  if (!response.ok) {
    const result = await response.json();
    throw json({ message: result.message }, { status: response.status });
  }
  const result = await response.json();
  return result;
};
