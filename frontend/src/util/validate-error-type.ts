export interface FetchErrorResponse {
  message: string;
  error: string | undefined;
  statusCode: number;
}

export function isFetchErrorResponse(
  value: unknown
): value is FetchErrorResponse {
  if (
    value &&
    typeof value === "object" &&
    "message" in value &&
    "error" in value &&
    "statusCode" in value &&
    typeof value.message === "string" &&
    (typeof value.error === "string" || value.error === undefined) &&
    typeof value.statusCode === "number"
  ) {
    return true;
  }

  return false;
}

export interface QueryError {
  data: FetchErrorResponse;
  status: number;
}
export function isQueryError(value: unknown): value is QueryError {
  if (
    value &&
    typeof value === "object" &&
    "data" in value &&
    isFetchErrorResponse(value.data) &&
    "status" in value &&
    typeof value.status === "number"
  ) {
    return true;
  }

  return false;
}
