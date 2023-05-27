import { API_ROUTES, BASE_URL } from "../constants";

export const postAuth = async (body: object) => {
  try {
    const url = `${BASE_URL}${API_ROUTES.auth}`;

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Server Error";
    throw new Error(errorMsg);
  }
};
