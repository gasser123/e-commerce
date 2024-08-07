import { json, LoaderFunction } from "react-router-dom";
import { SERVER_URL } from "../../config";
export const loader: LoaderFunction = async () => {
  const response = await fetch(`${SERVER_URL}/products`);
  if (!response.ok) {
    const result = await response.json();
    throw json({ message: result.message }, { status: response.status });
  }
  const result = await response.json();
  return result;
};