import { cookies } from "next/headers";

const BASE_URL = process.env.BACKEND_SERVER_URL || "";

const UNGUARDED_ROUTES = ["/user/signin", "/user/signup"];

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const isGuarded = !UNGUARDED_ROUTES.includes(endpoint);

  const cookieStore = await cookies();
  const access_cookie = cookieStore.get("access_token");

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(isGuarded && access_cookie
        ? { Authorization: `Bearer ${access_cookie?.value}` }
        : {}),
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  if (response.status === 401 && cookieStore.get("refresh_token")) {
    // call refresh endpoint here

    // Retry the request
    return apiClient(endpoint, options);
  }
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, body: ${errorText}`
    );
  }
  return response.json() as T;
}
