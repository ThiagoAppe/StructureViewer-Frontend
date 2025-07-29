import { apiUrl } from "./config";

async function fetchData(endpoint) {
  try {

    const response = await fetch(apiUrl(endpoint), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al obtener datos");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error de conexión:", error.message);
    throw error;
  }
}


async function postData(endpoint, body) {
  try {
    const response = await fetch(apiUrl(endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error en la solicitud POST");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error de conexión:", error.message);
    throw error;
  }
}

export { fetchData, postData };

