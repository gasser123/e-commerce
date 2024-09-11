import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface FetchErrorResponse {
  message: string;
  error: string | undefined;
  statusCode: number;
}

export interface CustomErrorResponse {
  message: string | string[];
}

export function isArrayOfString(value: unknown): value is string[] {
  if (value && Array.isArray(value)) {
    return value.every((element) => typeof element === "string");
  }
  return false;
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

// use this
export function isCustomErrorResponse(
  value: unknown
): value is CustomErrorResponse {
  if (
    value &&
    typeof value === "object" &&
    "message" in value &&
    (typeof value.message === "string" || isArrayOfString(value.message))
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

export function isCustomQueryError(value: unknown): value is QueryError {
  if (
    value &&
    typeof value === "object" &&
    "data" in value &&
    "status" in value &&
    typeof value.status === "number"
  ) {
    return true;
  }

  return false;
}

// use this
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}
