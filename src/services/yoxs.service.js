import { API_ROUTES, BASE_URL } from "../constants";

const url = `${BASE_URL}${API_ROUTES.yoxs}`;

export const getYoxs = async (desde) => {
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

export const getYox = async (id) => {
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

export const getYoxCateg = async (id) => {
  try {
    const resp = await fetch(`${url}/categId/${id}`, {
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

export const postYox = async (payload) => {
  try {
    const resp = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": JSON.parse(localStorage.getItem("auth")).token,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Server Error";
    throw new Error(errorMsg);
  }
};

export const putYox = async (id, payload) => {
  try {
    const resp = await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": JSON.parse(localStorage.getItem("auth")).token,
      },
    });
    const data = await resp.json();

    return data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Server Error";
    throw new Error(errorMsg);
  }
};

export const deleteYox = async (id) => {
  try {
    const resp = await fetch(`${url}/${id}`, {
      method: "DELETE",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": JSON.parse(localStorage.getItem("auth")).token,
      },
    });
    const data = await resp.json();

    return data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Server Error";
    throw new Error(errorMsg);
  }
};
