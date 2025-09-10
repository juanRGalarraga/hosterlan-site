import { API_URL } from "astro:env/client";

export interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

export async function fetcher<TData = any, TVariables = Record<string, any>>(
  query: string,
  variables?: TVariables
): Promise<TData> {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmIyZTdiN2Y0Nzk5ZWQzNThmZjRmOCIsImVtYWlsIjoiamdhbGFycmFnYUBvdXRsb29rLmNvbS5hciIsImlhdCI6MTc1NzUyNTE1MywiZXhwIjoxNzU3NTI4NzUzfQ.E1CN1oVJFqdReo-h253_gLNnjSPgWesmpym8J_q_kbk"
    },
    body: JSON.stringify({ query, variables }),
  });

  const json: GraphQLResponse<TData> = await res.json();

  if (json.errors) {
    const { message } = json.errors[0];
    throw new Error(message);
  }

  return json.data;
}