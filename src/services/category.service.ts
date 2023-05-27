import { API_ROUTES, BASE_URL } from "../constants";

const url = `${BASE_URL}${API_ROUTES.category}`;

export const getCategorias = async (desde?: number) => {
  try {
    const resp = await fetch(`${url}?desde=${desde}`, {
      method: "GET",

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

export const getCategoriaId = async (id: string) => {
  try {
    const resp = await fetch(`${url}/${id}`, {
      method: "GET",

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

export const postCategoria = async (payload: object) => {
  try {
    const resp = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": JSON.parse(localStorage.getItem("auth") ?? '').token,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Server Error";
    throw new Error(errorMsg);
  }
};

export const putCategoria = async (id: string, payload: object) => {
  try {
    const resp = await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": JSON.parse(localStorage.getItem("auth") ?? '').token,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Server Error";
    throw new Error(errorMsg);
  }
};

export const deleteCategoria = async (id: string) => {
  try {
    const resp = await fetch(`${url}/${id}`, {
      method: "DELETE",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": JSON.parse(localStorage.getItem("auth") ?? '').token,
      },
    });
    const data = await resp.json();

    return data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Server Error";
    throw new Error(errorMsg);
  }
};
