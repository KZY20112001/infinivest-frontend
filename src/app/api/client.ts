"use server";
import { cookies } from "next/headers";

const BACKEND_BASE_URL = process.env.BACKEND_SERVER_URL || "";
const MICROSERVICE_BASE_URL = process.env.FLASK_MICROSERVICE_URL || "";
const UNGUARDED_ROUTES = [
  "/user/signin",
  "/user/signup",
  "/user/refresh",
  "/user/forgot-password",
];

export async function backendClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  const url = `${BACKEND_BASE_URL}${endpoint}`;
  const isGuarded = !UNGUARDED_ROUTES.includes(endpoint);

  const cookieStore = await cookies();
  const access_cookie = cookieStore.get("access_token");

  const isFormData = options.body instanceof FormData;

  let headers;
  if (isFormData) {
    headers = {
      ...(isGuarded && access_cookie
        ? { Authorization: `Bearer ${access_cookie?.value}` }
        : {}),
      ...(options.headers || {}),
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      ...(isGuarded && access_cookie
        ? { Authorization: `Bearer ${access_cookie?.value}` }
        : {}),
      ...(options.headers || {}),
    };
  }
  const defaultOptions: RequestInit = {
    headers: headers,
    credentials: "include",
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  if (response.status === 401 && cookieStore.get("refresh_token")) {
    return backendClient(endpoint, options);
  }
  if (!response.ok) {
    const errorText = await response.text();
    console.log(`HTTP error! status: ${response.status}, body: ${errorText}`);
    return null;
  }
  return response.json() as T;
}

export async function microserviceClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  const url = `${MICROSERVICE_BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const defaultOptions: RequestInit = {
    headers: headers,
    credentials: "include",
    ...options,
  };

  const response = await fetch(url, defaultOptions);

  if (!response.ok) {
    const errorText = await response.text();
    console.log(`HTTP error! status: ${response.status}, body: ${errorText}`);
    return null;
  }
  return response.json() as T;
}
