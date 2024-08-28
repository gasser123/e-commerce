import { json } from "react-router-dom";
import { isQueryError } from "./validate-error-type";

export function handleError(error: unknown) {
  if (isQueryError(error)) {
    throw json({ message: error.data.message }, { status: error.status });
  }
}
